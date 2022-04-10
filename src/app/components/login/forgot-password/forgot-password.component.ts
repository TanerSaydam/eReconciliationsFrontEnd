import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordDto } from 'src/app/models/dtos/forgotPasswordDto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordDto:ForgotPasswordDto;
  isSuccess = true;
  isActive= false;
  message: string = "";
  password:string = "";
  value:string = "";
  isForgotPasswordButtonActive=true;

  constructor(
    private authService:AuthService,
    private activatedRoute:ActivatedRoute,
    private toastr:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p=>{
      this.confirmMail(p["value"]);
      this.value = p["value"];
    })
  }

  confirmMail(value:string){
    this.authService.confirmForgotPasswordValue(value).subscribe((res)=>{
      if (res == true) {
        this.isActive = true;
        this.isSuccess = true;
      }
    },(err)=>{
      this.isActive = true;
      this.isSuccess = false;
      this.message = err.error;
    })
  }

  changeInputClass(text:string){
    if (text != "") {
      return "input-group input-group-outline is-valid my-3"
    }else{
      return "input-group input-group-outline is-invalid my-3"
    }
  }

  changePassword(){
    this.forgotPasswordDto = {
      password: this.password,
      value:this.value
    };
    this.authService.changePasswordToForgotPassword(this.forgotPasswordDto).subscribe((res)=>{
      this.router.navigateByUrl("/login");
      this.toastr.success(res.message);
    },(err)=>{
      console.log(err);
      this.toastr.error(err.error)
    })
  }


}
