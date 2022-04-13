import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Company } from 'src/app/models/companyModel';
import { UserThemeOption } from 'src/app/models/userThemeOptionModel';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  jwtHelper:JwtHelperService = new JwtHelperService;
  userThemeOption:UserThemeOption = {
    sidenavType: "dark",
    id:0,
    mode:"",
    sidenavColor:"primary",
    userId:0
  };

  companies:Company[] = []

  isAuthenticated:boolean = false;

  updateForm:FormGroup;

  companyId:string;
  companyName:string;
  userId:string;
  styleClass = "";
  isDark:boolean = false;

  constructor(
    @Inject("validHatasi") private validHatasi:string,
    private userOperationClaimService:UserOperationClaimService,
    private authService:AuthService,
    private spinner:NgxSpinnerService,
    private companyService:CompanyService,
    private toastr:ToastrService,
    private router:Router,
    private userService:UserService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.getUserCompanyList();
    this.getUserTheme();
    this.createUpdateForm();
  }

  refresh() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      let token = localStorage.getItem("token");
      let decode = this.jwtHelper.decodeToken(token);
      //console.log(decode)
      let companyId = Object.keys(decode).filter(x => x.endsWith("/anonymous"))[0];
      let userId = Object.keys(decode).filter(x => x.endsWith("/nameidentifier"))[0];
      let companyName = Object.keys(decode).filter(x => x.endsWith("/ispersistent"))[0];
      this.companyId = decode[companyId];
      this.companyName = decode[companyName];
      this.userId = decode[userId];
    }
  }

  changeStyleClass(text:string){
    return "fixed-plugin ps " + text;
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

  getUserCompanyList(){
    this.showSpinner();
    this.companyService.getCompanyListByUserid(this.userId).subscribe((res) => {

      this.companies = res.data;
      this.hideSpinner();
    }, (err) => {
      this.toastr.error("Bir hata ile karşılaştık. Biraz sonra tekrar deneyin")
      this.hideSpinner();
    })
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      id: [0,Validators.required],
      name: ["",Validators.required],
      email: ["",Validators.required],
      password: [""],
      companyId: [this.companyId,Validators.required]
    });
  }

  changeCompany(companyId:number){
    this.showSpinner();
    this.authService.changeCompany(this.userId,companyId).subscribe((res)=> {
      localStorage.removeItem("token");
      this.hideSpinner();
      localStorage.setItem("token",res.data.token)
      this.toastr.info("Şirket başarıyla değiştirildi")
      window.location.reload();
    },
    (err)=> {
      this.hideSpinner();
      this.toastr.error(err.error)
    })
  }

  changeSideNav(color:string){
    this.userThemeOption.sidenavColor = color;
    this.changeTheme();
  }

  changeSideType(color:string){
    this.userThemeOption.sidenavType = color;
    this.changeTheme();
  }

  changeMode(value:boolean){
    if (value) {
      this.userThemeOption.mode = "dark-version";
    }
    else{
      this.userThemeOption.mode = " ";
    }
    this.changeTheme();
  }

  changeTheme(){
    this.showSpinner();
    this.userService.changeTheme(this.userThemeOption).subscribe((res)=>{
      this.hideSpinner();
      this.toastr.success(res.message);
    },(err)=>{
      this.hideSpinner();
      console.log(err);
    })
  }

  update(){
    if (this.updateForm.valid) {
      let userUpdateModel = Object.assign({}, this.updateForm.value);
      this.showSpinner();
      this.userService.update(userUpdateModel).subscribe((res) => {
        this.hideSpinner();
        this.toastr.warning(res.message);
        this.createUpdateForm();
        document.getElementById("closeUpdateModal").click();
      }, (err) => {
        //console.log(err);
        this.toastr.error(err.error)
        this.hideSpinner();
      })
    }else{
      this.toastr.error(this.validHatasi);
    }
  }

  getById(id:string){
    this.showSpinner();
    let userId = Number(id)
    this.userService.getById(userId).subscribe((res) => {
      this.hideSpinner();
      this.updateForm.controls["id"].setValue(res.data.id);
      this.updateForm.controls["name"].setValue(res.data.name);
      this.updateForm.controls["email"].setValue(res.data.email);
    }, (err) => {
      //console.log(err);
      this.toastr.error(err.error)
      this.hideSpinner();
    })
  }


  logout(){
    localStorage.removeItem("token");
    this.router.navigate(["/login"])
    this.isAuthenticated = false;
  }
}
