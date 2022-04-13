import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Company } from 'src/app/models/companyModel';
import { OperationClaimForUserListDto } from 'src/app/models/dtos/operationClaimForUserListDto';
import { UserThemeOption } from 'src/app/models/userThemeOptionModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-operation-claim',
  templateUrl: './user-operation-claim.component.html',
  styleUrls: ['./user-operation-claim.component.scss']
})
export class UserOperationClaimComponent implements OnInit {

  private jwtHelper:JwtHelperService = new JwtHelperService;

  operationClaimForUserListDto:OperationClaimForUserListDto[] = [];
  companies:Company[] = [];
  userThemeOption:UserThemeOption = {
    sidenavType: "dark",
    id:0,
    mode:"",
    sidenavColor:"primary",
    userId:0
  };

  searchString:string;
  title:string;
  isAuthenticated= false;
  companyId:string;
  userId:string;
  value:string;
  selectCompany:string;


  constructor(
    private activatedRoute:ActivatedRoute,
    private userService:UserService,
    private spinner:NgxSpinnerService,
    private authService:AuthService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.activatedRoute.params.subscribe(p=>{
      this.value =p["value"];
      this.getUserOperationClaim(p["value"], this.companyId);
      this.getUserCompanyList(p["value"]);
    })
    this.getUserTheme();
  }

  refresh() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem("token");
      let decode = this.jwtHelper.decodeToken(token);
      let companyId = Object.keys(decode).filter(x => x.endsWith("/anonymous"))[0];
      let userId = Object.keys(decode).filter(x => x.endsWith("/nameidentifier"))[0];
      this.companyId = decode[companyId];
      this.userId = decode[userId];
    }
  }

  getUserTheme(){
    this.showSpinner();
    this.userService.getTheme(this.userId).subscribe((res)=>{
      this.userThemeOption = res.data
      this.hideSpinner();
    },(err)=>{
      console.log(err);
      this.hideSpinner();
    })
  }

  getUserOperationClaim(value:string, companyId:string){
    this.showSpinner();
    this.userService.getOperationClaimForUser(value,companyId).subscribe((res) => {
      this.operationClaimForUserListDto = res.data;
      this.title = res.data[0].userName + " Kullanıcı Yetkileri";
      this.hideSpinner();
    }, (err) => {
      this.toastr.error("Bir hata ile karşılaştık. Biraz sonra tekrar deneyin")
      this.hideSpinner();
    })
  }

  getUserCompanyList(value:string){
    this.showSpinner();
    this.userService.getUserCompanyListByValue(value).subscribe((res) => {
      this.companies = res.data;
      this.selectCompany = this.companyId;
      this.hideSpinner();
    }, (err) => {
      this.toastr.error("Bir hata ile karşılaştık. Biraz sonra tekrar deneyin")
      this.hideSpinner();
    })
  }

  changeCompany(){
    this.getUserOperationClaim(this.value,this.selectCompany);
  }

  updateUserOperationClaim(operationClaim:OperationClaimForUserListDto){
      this.showSpinner();
      this.userService.updateOperationClaim(operationClaim).subscribe((res) => {
        this.hideSpinner();
        this.toastr.warning(res.message);
        this.getUserOperationClaim(this.value, this.selectCompany);
      }, (err) => {
        this.toastr.error(err.error)
        this.hideSpinner();
      })
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }
}
