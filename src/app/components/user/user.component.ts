import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminCompaniesForUserDto } from 'src/app/models/dtos/adminCompaniesForUserDto';
import { UserDto } from 'src/app/models/dtos/userDto';
import { UserForRegisterToSecondAccountDto } from 'src/app/models/dtos/userForRegisterToSecondAccountDto';
import { UserReletionShipDto } from 'src/app/models/dtos/userReletionShipDto';
import { UserOperationClaim } from 'src/app/models/userOperationClaimModel';
import { UserThemeOption } from 'src/app/models/userThemeOptionModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  jwtHelper: JwtHelperService = new JwtHelperService;

  userOperationCliams:UserOperationClaim[] = []
  users:UserDto[] = [];
  userForRegisterToSecondAccountDto:UserForRegisterToSecondAccountDto;
  usersReletionShipDto:UserReletionShipDto[] = [];
  userReletionShipDto:UserReletionShipDto;
  adminCompaniesForUserDto: AdminCompaniesForUserDto[] = [];
  userThemeOption:UserThemeOption = {
    sidenavType: "dark",
    id:0,
    mode:"",
    sidenavColor:"primary",
    userId:0
  };

  addForm:FormGroup;
  updateForm:FormGroup;

  title: string = "Aktif Kullanıcı Listesi";
  operationAdd = false;
  operationUpdate = false;
  operationDelete = false;
  operationGet = false;
  operationList = false;
  isAuthenticated= false;
  companyId:string;
  userId:string;
  allList=false;
  activeList=true;
  passiveList=false;
  searchString:string;
  allListCheck = "";
  activeListCheck = "checked";
  passiveListCheck = "";
  name:string= "";
  email:string="";
  password:string="";
  selectCompany:number = 0;

  filterText:string = "true";

  constructor(
    @Inject("validHatasi") private validHatasi:string,
    private authService:AuthService,
    private toastr:ToastrService,
    private userOperationClaimService:UserOperationClaimService,
    private spinner: NgxSpinnerService,
    private userService:UserService,
    private formBuilder:FormBuilder

  ) { }

  ngOnInit(): void {
    this.refresh();
    this.userOperationClaimGetList();
    this.getUserTheme();
    this.getAdminUsersList();
    this.createAddForm();
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

  userOperationClaimGetList(){
    this.showSpinner();
    this.userOperationClaimService.getlist(this.userId,this.companyId).subscribe((res) => {
      this.userOperationCliams = res.data;
      this.userOperationCliams.forEach(element => {
        if (element.operationClaimName == "Admin") {
          this.operationAdd = true;
          this.operationUpdate = true;
          this.operationDelete = true;
          this.operationGet = true;
          this.operationList = true;
        }

        if (element.operationClaimName == "User.Add") {
          this.operationAdd = true;
        }

        if (element.operationClaimName == "User.Update") {
          this.operationUpdate = true;
        }

        if (element.operationClaimName == "User.Delete") {
          this.operationDelete = true;
        }

        if (element.operationClaimName == "User.GetList") {
          this.operationList = true;
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

  exportExcel() {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let title = this.title;
    title = title + ".xlsx";
    XLSX.writeFile(wb, title);
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  getUserList(){
    this.showSpinner();
    this.userService.getUserList(this.companyId).subscribe((res) => {
      this.users = res.data;
      //console.log(res.data)
      this.hideSpinner();
    }, (err) => {
      this.toastr.error("Bir hata ile karşılaştık. Biraz sonra tekrar deneyin")
      //console.log(err)
      this.hideSpinner();
    })
  }

  getAdminUsersList(){
    this.showSpinner();
    this.userService.getAdminUsersList(this.userId).subscribe((res) => {
      this.usersReletionShipDto = res.data;
      this.hideSpinner();
    }, (err) => {
      this.toastr.error("Bir hata ile karşılaştık. Biraz sonra tekrar deneyin")
      //console.log(err)
      this.hideSpinner();
    })
  }

  userDelete(userId:number){
    this.showSpinner();
    this.userService.userDelete(userId).subscribe((res) => {
      this.getAdminUsersList();
      this.hideSpinner();
    }, (err) => {
      this.toastr.error("Bir hata ile karşılaştık. Biraz sonra tekrar deneyin")
      //console.log(err)
      this.hideSpinner();
    })
  }

  getUserCompanyList(userId:number){
    this.showSpinner();
    this.userService.getUserCompanyList(userId).subscribe((res) => {
      this.userReletionShipDto = res.data;
      this.getAdminCompanyList(this.userId, userId);
      this.hideSpinner();
    }, (err) => {
      this.toastr.error("Bir hata ile karşılaştık. Biraz sonra tekrar deneyin")
      //console.log(err)
      this.hideSpinner();
    })
  }

  userCompanyDelete(userId:number, companyId:number){
    this.showSpinner();
    this.userService.userCompanyDelete(userId,companyId).subscribe((res) => {
      this.toastr.warning(res.message);
      this.getUserCompanyList(userId);
    }, (err) => {
      this.toastr.error("Bir hata ile karşılaştık. Biraz sonra tekrar deneyin")
      //console.log(err)
      this.hideSpinner();
    })
  }

  getAdminCompanyList(adminUserId: string, userUserId:number){
    this.showSpinner();
    this.userService.getAdminCompaniesForUser(adminUserId,userUserId).subscribe((res) => {
      this.adminCompaniesForUserDto = res.data;
      this.hideSpinner();
    }, (err) => {
      this.toastr.error("Bir hata ile karşılaştık. Biraz sonra tekrar deneyin")
      //console.log(err)
      this.hideSpinner();
    })
  }

  userCompanyAdd(userId: number, companyId:number){
    if (companyId == 0) {
      this.toastr.error("Şirket seçimi yapmadınız!")
      return;
    }

    this.showSpinner();
    this.userService.userCompanyAdd(userId,companyId).subscribe((res) => {
      this.getUserCompanyList(userId);
      this.toastr.success(res.message);
      this.hideSpinner();
    }, (err) => {
      this.toastr.error("Bir hata ile karşılaştık. Biraz sonra tekrar deneyin")
      //console.log(err)
      this.hideSpinner();
    })
  }

  createAddForm(){
    this.addForm = this.formBuilder.group({
      id: [0,Validators.required],
      name: ["",Validators.required],
      email: ["",Validators.required],
      password: ["",Validators.required],
      companyId: [this.companyId,Validators.required],
      adminUserId: [this.userId,Validators.required]
    });
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

  getById(id:number){
    this.showSpinner();
    this.userService.getById(id).subscribe((res) => {
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

  clearInput(){
    this.name = "";
    this.email = "";
    this.password = "";
  }

  add(){
    if (this.addForm.valid) {
      let userRegisterModel = Object.assign({}, this.addForm.value);
      this.showSpinner();
      this.userService.register(userRegisterModel).subscribe((res) => {
        this.hideSpinner();
        this.toastr.success(res.message);
        this.getAdminUsersList();
        this.createAddForm();
        this.clearInput();
        document.getElementById("closeModal").click();
      }, (err) => {
        //console.log(err);
        this.toastr.error(err.error)
        this.hideSpinner();
      })
    }else{
      this.toastr.error(this.validHatasi);
    }
  }

  update(){
    if (this.updateForm.valid) {
      let userUpdateModel = Object.assign({}, this.updateForm.value);
      this.showSpinner();
      this.userService.update(userUpdateModel).subscribe((res) => {
        this.hideSpinner();
        this.toastr.warning(res.message);
        this.getAdminUsersList();
        this.createUpdateForm();
        this.clearInput();
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

  changeStatus(id:number) {
    this.showSpinner();
    this.userService.changeStatus(id).subscribe((res) => {
      this.hideSpinner();
      this.toastr.warning(res.message);
      this.getAdminUsersList();
    }, (err) => {
      //console.log(err);
      this.toastr.error(err.error)
      this.hideSpinner();
    })
  }

  getListByCheck(text: string) {
    if (text == "allList") {
      this.activeList = false;
      this.passiveList = false;

      this.allListCheck = "checked";
      this.activeListCheck = "";
      this.passiveListCheck = "";

      this.filterText = "";

      this.title = "Tüm Kullanıcı Listesi";
    } else if (text == "activeList") {
      this.allList = false;
      this.passiveList = false;

      this.allListCheck = "";
      this.activeListCheck = "checked";
      this.passiveListCheck = "";

      this.filterText = "true";

      this.title = "Aktif Kullanıcı Listesi";
    } else if (text == "passiveList") {
      this.allList = false;
      this.activeList = false;

      this.allListCheck = "";
      this.activeListCheck = "";
      this.passiveListCheck = "checked";

      this.filterText = "false";

      this.title = "Pasif Kullanıcı Listesi";
    }
  }

  changeInputClass(text: string) {
    if (text != "") {
      return "input-group input-group-outline is-valid my-3"
    } else {
      return "input-group input-group-outline is-invalid my-3"
    }
  }


}
