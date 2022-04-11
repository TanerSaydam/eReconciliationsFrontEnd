import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterDto } from 'src/app/models/dtos/registerDto';
import { TermsAndConditions } from 'src/app/models/termsAndCondition';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerDto:RegisterDto;
  termsAndConditions:TermsAndConditions = {description: "",id:0};

  registerForm:FormGroup;

  name:string = "";
  email:string = "";
  password:string = "";
  companyName:string = "";
  address:string = "";
  taxDepartment:string = "";
  taxIdNumber:string = "";
  identityNumber:string = "";
  termsAndConditionsCheck:boolean = false;
  isRegisterButtonActive: boolean = true;
  isRegisterComplete:boolean = false;

  constructor(
    @Inject('validHatasi') private validHatasi:string,
    private authService:AuthService,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private datePipe:DatePipe,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getTermsAndConditions();
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      name: ["",Validators.required],
      email: ["",Validators.required],
      password: ["",Validators.required],
      companyName: ["",Validators.required],
      address: ["",Validators.required],
      taxDepartment: [""],
      taxIdNumber: [""],
      identityNumber: [""],
      addedAt: [Date.now()],
      isActive: [true]
    })
  }

  register(){
    if (this.termsAndConditionsCheck) {
      if (this.registerForm.valid) {
        this.isRegisterButtonActive = false;
        let registerModel = Object.assign({},this.registerForm.value);
        this.registerDto = {
          "userForRegister":{
            email: registerModel.email,
            name:registerModel.name,
            password:registerModel.password
          },
          "company":{
            addedAt:(this.datePipe.transform(Date(), 'yyyy-MM-dd')),
            address:registerModel.address,
            id:0,
            identityNumber:registerModel.identityNumber,
            isActive:true,
            name:registerModel.companyName,
            taxDepartment:registerModel.taxDepartment,
            taxIdNumber:registerModel.taxIdNumber,
          }
        };

        this.authService.register(this.registerDto).subscribe((res)=>{
          this.isRegisterComplete = true;
        },
        (err)=> {
          this.isRegisterButtonActive = true;
          this.toastr.error(err.error)
        })
      }else{
        this.toastr.error(this.validHatasi)
      }
    }else{
      this.toastr.warning("Kullanıcı sözleşmesini onaylamadan kayıt olamazsınız","Hata!")
    }

  }

  changeInputClass(text:string){
    if (text != "") {
      return "input-group input-group-outline is-valid my-3"
    }else{
      return "input-group input-group-outline is-invalid my-3"
    }
  }

  getTermsAndConditions(){
    this.authService.getTermsAndConditions().subscribe((res)=>{
      this.termsAndConditions = res.data;
    },(err)=>{
      this.toastr.error(err.error);
    })
  }

}
