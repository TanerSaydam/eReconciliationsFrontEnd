import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
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
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  ) { }

  register(registerDto: RegisterDto){
    let api = this.apiUrl + "auth/register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(api,registerDto);
  }

  login(loginModel: LoginModel){
    let api = this.apiUrl + "auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(api,loginModel);
  }

  changeCompany(userId:string, companyId:number){
    let api = this.apiUrl + "auth/changeCompany?userId=" + userId + "&companyId=" + companyId;
    return this.httpClient.get<SingleResponseModel<TokenModel>>(api);
  }

  getTermsAndConditions(){
    let api = this.apiUrl + "TermsAndConditions/get";
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
    let api = this.apiUrl + "auth/sendConfirmEmail?email=" + email;
    return this.httpClient.get<ResponseModel>(api);
  }

  confirmUser(value:string){
    let api = this.apiUrl + "auth/confirmuser?value=" + value;
    return this.httpClient.get<ResponseModel>(api);
  }

  sendForgotPassword(email:string){
    let api = this.apiUrl + "auth/forgotPassword?email=" + email;
    return this.httpClient.get<ResponseModel>(api);
  }

  confirmForgotPasswordValue(value:string){
    let api = this.apiUrl + "auth/forgotPasswordLinkCheck?value=" + value;
    return this.httpClient.get(api);
  }

 changePasswordToForgotPassword(forgotPasswordDto: ForgotPasswordDto){
    let api = this.apiUrl + "auth/changePasswordToForgotPassword";
    return this.httpClient.post<ResponseModel>(api,forgotPasswordDto);
  }

}
