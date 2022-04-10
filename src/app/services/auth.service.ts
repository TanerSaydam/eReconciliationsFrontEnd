import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForgotPasswordDto } from '../models/dtos/forgotPasswordDto';
import { RegisterDto } from '../models/dtos/registerDto';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/reponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TermsAndConditions } from '../models/termsAndCondition';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public redirectUrl:string;

  constructor(
    private httpClient: HttpClient
  ) { }

  register(registerDto: RegisterDto){
    let api = "https://localhost:7220/api/auth/register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(api,registerDto);
  }

  login(loginModel: LoginModel){
    let api = "https://localhost:7220/api/auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(api,loginModel);
  }

  getTermsAndConditions(){
    let api = "https://localhost:7220/api/TermsAndConditions/get";
    return this.httpClient.get<SingleResponseModel<TermsAndConditions>>(api);
  }

  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    }
    else{
      return false;
    }
  }

  sendConfirmEmail(email:string){
    let api = "https://localhost:7220/api/auth/sendConfirmEmail?email=" + email;
    return this.httpClient.get<ResponseModel>(api);
  }

  confirmUser(value:string){
    let api = "https://localhost:7220/api/auth/confirmuser?value=" + value;
    return this.httpClient.get<ResponseModel>(api);
  }

  sendForgotPassword(email:string){
    let api = "https://localhost:7220/api/auth/forgotPassword?email=" + email;
    return this.httpClient.get<ResponseModel>(api);
  }

  confirmForgotPasswordValue(value:string){
    let api = "https://localhost:7220/api/auth/forgotPasswordLinkCheck?value=" + value;
    return this.httpClient.get(api);
  }

 changePasswordToForgotPassword(forgotPasswordDto: ForgotPasswordDto){
    let api = "https://localhost:7220/api/auth/changePasswordToForgotPassword";
    return this.httpClient.post<ResponseModel>(api,forgotPasswordDto);
  }

}
