import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserOperationClaim } from 'src/app/models/userOperationClaimModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  jwtHelper: JwtHelperService = new JwtHelperService;

  userOperationCliams:UserOperationClaim[] = [];

  isAuthenticated:boolean;
  name:string;
  companyName:string;
  currentUrl:string = "";
  companyId:string;
  userId:string;

  currencyAccount = false;
  user = false;
  company = false;
  mailParameter = false;
  mailTemplete = false;
  accountReconciliation = false;
  baBsReconciliation = false;

  constructor(
    private authService:AuthService,
    private toastr: ToastrService,
    private router:Router,
    private userOperationClaimService:UserOperationClaimService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.refresh();
    this.userOperationClaimGetList();
  }

  changeClass(url:string){
    this.currentUrl = this.router.routerState.snapshot.url;
    if (url == this.currentUrl) {
      return "nav-link text-white active bg-gradient-primary";
    }
    else{
      return "nav-link text-white"
    }
  }


  refresh(){
    if (this.isAuthenticated) {
      let token = localStorage.getItem("token");
      let decode = this.jwtHelper.decodeToken(token);
      let name= Object.keys(decode).filter(x=> x.endsWith("/name"))[0];
      let companyName = Object.keys(decode).filter(x=> x.endsWith("/ispersistent"))[0];
      this.name = decode[name];
      this.companyName = decode[companyName];

      let companyId = Object.keys(decode).filter(x => x.endsWith("/anonymous"))[0];
      let userId = Object.keys(decode).filter(x => x.endsWith("/nameidentifier"))[0];
      this.companyId = decode[companyId];
      this.userId = decode[userId];
      //console.log(decode);
    }
  }

  logout(){
    localStorage.removeItem("token");
    this.toastr.warning("Başarıyla çıkış yaptınız");
    this.router.navigate(["/login"])
    this.isAuthenticated = false;
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  userOperationClaimGetList(){
    this.showSpinner();
    this.userOperationClaimService.getlist(this.userId,this.companyId).subscribe((res) => {
      this.userOperationCliams = res.data;
      this.userOperationCliams.forEach(element => {
        if (element.operationClaimName == "Admin") {
          this.currencyAccount = true;
          this.user = true;
          this.company = true;
          this.mailParameter = true;
          this.mailTemplete = true;
          this.accountReconciliation = true;
          this.baBsReconciliation = true;
        }

        if (element.operationClaimName == "CurrencyAccount") {
          this.currencyAccount = true;
        }

        if (element.operationClaimName == "Company") {
          this.company = true;
        }

        if (element.operationClaimName == "User") {
          this.user = true;
        }

        if (element.operationClaimName == "MailParameter") {
          this.mailParameter = true;
        }

        if (element.operationClaimName == "MailTemplete") {
          this.mailTemplete = true;
        }

        if (element.operationClaimName == "AccountReconciliation") {
          this.accountReconciliation = true;
        }

        if (element.operationClaimName == "BaBsReconciliation") {
          this.baBsReconciliation = true;
        }

      });

      //console.log(this.userOperationCliams)
      this.hideSpinner();
    }, (err) => {
      this.toastr.error("Bir hata ile karşılaştık. Biraz sonra tekrar deneyin")
      //console.log(err)
      this.hideSpinner();
    })
  }


}
