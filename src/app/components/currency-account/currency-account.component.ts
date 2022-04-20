import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CurrencyAccount } from 'src/app/models/currencyAccountModel';
import { UserOperationClaim } from 'src/app/models/userOperationClaimModel';
import { UserThemeOption } from 'src/app/models/userThemeOptionModel';
import { AuthService } from 'src/app/services/auth.service';
import { CurrencyAccountService } from 'src/app/services/currency-account.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-currency-account',
  templateUrl: './currency-account.component.html',
  styleUrls: ['./currency-account.component.scss']
})
export class CurrencyAccountComponent implements OnInit {

  @Inject("validHatasi") private validHatasi:string;

  jwtHelper: JwtHelperService = new JwtHelperService;

  currencyAccounts: CurrencyAccount[] = []
  userOperationCliams: UserOperationClaim[] = []
  currencyAccount: CurrencyAccount = {
    addedAt: "",
    address: "",
    authorized: "",
    code: "",
    companyId: 0,
    email: "",
    id: 0,
    identityNumber: "",
    isActive: true,
    name: "",
    taxDepartment: "",
    taxIdNumber: ""
  };
  userThemeOption:UserThemeOption = {
    sidenavType: "dark",
    id:0,
    mode:"",
    sidenavColor:"primary",
    userId:0
  };

  addForm: FormGroup;
  updateForm:FormGroup;

  isAuthenticated: boolean;
  companyId: string;
  userId: string;
  searchString: string;
  allList: boolean = false;
  activeList: boolean = true;
  passiveList: boolean = false;
  allListCheck: string = "";
  activeListCheck: string = "";
  passiveListCheck: string = "";
  title: string = "Aktif Cari Liste";
  filterText: string = "";
  code: string;
  name: string = "";
  address: string = "";
  taxDepartment: string;
  taxIdNumber: string;
  identityNumber: string;
  email: string;
  authorized: string;
  file:string;
  operationAdd = false;
  operationUpdate = false;
  operationDelete = false;
  operationGet = false;
  operationList = false;

  constructor(
    private currencyAccountService: CurrencyAccountService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private userOperationClaimService:UserOperationClaimService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.userOperationClaimGetList()
    this.getUserTheme();
    this.getlist();
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

        if (element.operationClaimName == "CurrencyAccount.Add") {
          this.operationAdd = true;
        }

        if (element.operationClaimName == "CurrencyAccount.Update") {
          this.operationUpdate = true;
        }

        if (element.operationClaimName == "CurrencyAccount.Delete") {
          this.operationDelete = true;
        }

        if (element.operationClaimName == "CurrencyAccount.Get") {
          this.operationGet = true;
        }

        if (element.operationClaimName == "CurrencyAccount.GetList") {
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

  getlist() {
    this.showSpinner();
    this.currencyAccountService.getlist(this.companyId).subscribe((res) => {
      this.currencyAccounts = res.data;
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

  createAddForm() {
    this.addForm = this.formBuilder.group({
      companyId: [this.companyId, Validators.required],
      code: [""],
      name: ["", (Validators.required, Validators.minLength(3))],
      address: ["", (Validators.required, Validators.minLength(3))],
      taxDepartment: [""],
      taxIdNumber: [""],
      identityNumber: [""],
      email: [""],
      authorized: [""],
      addedAt: [this.datePipe.transform(Date(), 'yyyy-MM-dd')],
      isActive: true
    });
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id:[0],
      companyId: [this.companyId, Validators.required],
      code: [""],
      name: ["", (Validators.required, Validators.minLength(3))],
      address: ["", (Validators.required, Validators.minLength(3))],
      taxDepartment: [""],
      taxIdNumber: [""],
      identityNumber: [""],
      email: [""],
      authorized: [""],
      addedAt: [this.datePipe.transform(Date(), 'yyyy-MM-dd')],
      isActive: true
    });
  }

  changeInputClass(text: string) {
    if (text != "") {
      return "input-group input-group-outline is-valid my-3"
    } else {
      return "input-group input-group-outline is-invalid my-3"
    }
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  deleteCurrencyAccount(currencyAccount: CurrencyAccount) {
    this.showSpinner();
    this.currencyAccountService.delete(currencyAccount).subscribe((res) => {
      this.hideSpinner();
      this.toastr.info(res.message);
      this.getlist();
    }, (err) => {
      //console.log(err);
      this.toastr.error(err.error)
      this.hideSpinner();
    })
  }

  changeStatusCurrencyAccount(currencyAccount: CurrencyAccount) {
    this.showSpinner();
    currencyAccount.isActive ? currencyAccount.isActive = false : currencyAccount.isActive = true

    this.currencyAccountService.update(currencyAccount).subscribe((res) => {
      this.hideSpinner();
      this.toastr.warning(res.message);
      this.getlist();
    }, (err) => {
      //console.log(err);
      this.toastr.error(err.error)
      this.hideSpinner();
    })
  }

  addCurrencyAccount() {

    if (this.addForm.valid) {
      let currencyAccountModel = Object.assign({}, this.addForm.value);
      this.showSpinner();
      this.currencyAccountService.add(currencyAccountModel).subscribe((res) => {
        this.hideSpinner();
        this.toastr.success(res.message);
        this.getlist();
        this.createAddForm();
        document.getElementById("closeCurrencyAccountModal").click();
      }, (err) => {
        //console.log(err);
        this.toastr.error(err.error)
        this.hideSpinner();
      })
    }else{
      this.toastr.error(this.validHatasi);
    }
  }

  updateCurrencyAccount() {
    if (this.updateForm.valid) {
      let currencyAccountModel = Object.assign({}, this.updateForm.value);
      this.showSpinner();
      this.currencyAccountService.update(currencyAccountModel).subscribe((res) => {
        this.hideSpinner();
        this.toastr.warning(res.message);
        this.getlist();
        this.createAddForm();
        document.getElementById("closeUpdateCurrencyAccountModal").click();
      }, (err) => {
        //console.log(err);
        this.toastr.error(err.error)
        this.hideSpinner();
      })
    }else{
      this.toastr.error(this.validHatasi);
    }
  }

  currenctCurrency(currencyAccount: CurrencyAccount) {
    this.currencyAccount = currencyAccount;
    //console.log(this.currencyAccount);
  }

  getListByCheck(text: string) {

    if (text == "allList") {
      this.activeList = false;
      this.passiveList = false;

      this.allListCheck = "checked";
      this.activeListCheck = "";
      this.passiveListCheck = "";

      this.filterText = "";

      this.title = "Tüm Cari Liste";
    } else if (text == "activeList") {
      this.allList = false;
      this.passiveList = false;

      this.allListCheck = "";
      this.activeListCheck = "checked";
      this.passiveListCheck = "";

      this.filterText = "true";

      this.title = "Aktif Cari Liste";
    } else if (text == "passiveList") {
      this.allList = false;
      this.activeList = false;

      this.allListCheck = "";
      this.activeListCheck = "";
      this.passiveListCheck = "checked";

      this.filterText = "false";

      this.title = "Pasif Cari Liste";
    }
  }

  getCurrencyAccount(id:number){
    this.showSpinner();
    this.currencyAccountService.getbyid(id).subscribe((res) => {
      this.hideSpinner();
      this.currencyAccount = res.data;
      this.updateForm.controls["id"].setValue(res.data.id);
      this.updateForm.controls["companyId"].setValue(res.data.companyId);
      this.updateForm.controls["code"].setValue(res.data.code);
      this.updateForm.controls["name"].setValue(res.data.name);
      this.updateForm.controls["address"].setValue(res.data.address);
      this.updateForm.controls["taxDepartment"].setValue(res.data.taxDepartment);
      this.updateForm.controls["taxIdNumber"].setValue(res.data.taxIdNumber);
      this.updateForm.controls["identityNumber"].setValue(res.data.identityNumber);
      this.updateForm.controls["authorized"].setValue(res.data.authorized);
      //console.log(this.currencyAccount)
    }, (err) => {
      //console.log(err);
      this.toastr.error(err.error)
      this.hideSpinner();
    })
  }

  onChange(event:any){
    this.file = event.target.files[0];
  }

  addFormExcelCurrencyAccount() {
    if (this.file != null || this.file != "") {
      this.showSpinner();
      this.currencyAccountService.addFromExcel(this.file,this.companyId).subscribe((res) => {
        this.hideSpinner();
        this.toastr.success(res.message);
        this.getlist();
        document.getElementById("closeAddFromExcelModal").click();
        this.file = "";
      }, (err) => {
        //console.log(err);
        this.toastr.error(err.error)
        this.hideSpinner();
      })
    }else{
      this.toastr.error(this.validHatasi);
    }
  }

}
