import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/reponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UserDto } from '../models/dtos/userDto';
import { UserForRegisterToSecondAccountDto } from '../models/dtos/userForRegisterToSecondAccountDto';
import { OperationClaimForUserListDto } from '../models/dtos/operationClaimForUserListDto';
import { UserReletionShipDto } from '../models/dtos/userReletionShipDto';
import { AdminCompaniesForUserDto } from '../models/dtos/adminCompaniesForUserDto';
import { Company } from '../models/companyModel';
import { UserThemeOption } from '../models/userThemeOptionModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient
  ) { }

  register(registerDto: UserForRegisterToSecondAccountDto):Observable<ResponseModel>{
    let api = this.apiUrl + "auth/registerSecondAccount";
    return this.httpClient.post<ResponseModel>(api,registerDto);
  }

  update(registerDto: UserForRegisterToSecondAccountDto):Observable<ResponseModel>{
    let api = this.apiUrl + "users/update";
    return this.httpClient.post<ResponseModel>(api,registerDto);
  }

  updateOperationClaim(operationClaimForUserListDto: OperationClaimForUserListDto):Observable<ResponseModel>{
    let api = this.apiUrl + "users/updateOperationClaim";
    return this.httpClient.post<ResponseModel>(api,operationClaimForUserListDto);
  }

  changeStatus(id:number):Observable<ResponseModel>{
    let api = this.apiUrl + "users/changeStatus?id=" + id;
    return this.httpClient.get<ResponseModel>(api);
  }

  getById(id: number):Observable<SingleResponseModel<UserForRegisterToSecondAccountDto>>{
    let api = this.apiUrl + "users/getById?id=" + id;
    return this.httpClient.get<SingleResponseModel<UserForRegisterToSecondAccountDto>>(api)
  }

  getUserList(companyId: string):Observable<ListResponseModel<UserDto>>{
    let api = this.apiUrl + "users/getUserList?companyid=" + companyId;
    return this.httpClient.get<ListResponseModel<UserDto>>(api)
  }

  getAdminUsersList(adminUserId: string):Observable<ListResponseModel<UserReletionShipDto>>{
    let api = this.apiUrl + "users/getAdminUsersList?adminUserId=" + adminUserId;
    return this.httpClient.get<ListResponseModel<UserReletionShipDto>>(api)
  }

  getUserCompanyList(userId: number):Observable<SingleResponseModel<UserReletionShipDto>>{
    let api = this.apiUrl + "users/getUserCompanyList?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<UserReletionShipDto>>(api)
  }

  getAdminCompaniesForUser(adminUserId: string, userUserId:number):Observable<ListResponseModel<AdminCompaniesForUserDto>>{
    let api = this.apiUrl + "users/getAdminCompaniesForUser?adminUserId=" + adminUserId + "&userUserId=" + userUserId;
    return this.httpClient.get<ListResponseModel<AdminCompaniesForUserDto>>(api)
  }

  getUserCompanyListByValue(value:string):Observable<ListResponseModel<Company>>{
    let api = this.apiUrl + "users/getUserCompanyListByValue?value=" + value;
    return this.httpClient.get<ListResponseModel<Company>>(api)
  }


  userCompanyAdd(userId: number, companyId:number):Observable<ResponseModel>{
    let api = this.apiUrl + "users/userCompanyAdd?userId=" + userId + "&companyId=" + companyId;
    return this.httpClient.get<ResponseModel>(api)
  }

  userCompanyDelete(userId: number, companyId:number):Observable<ResponseModel>{
    let api = this.apiUrl + "users/userCompanyDelete?userId=" + userId + "&companyId=" + companyId;
    return this.httpClient.get<ResponseModel>(api)
  }

  userDelete(userId: number):Observable<ResponseModel>{
    let api = this.apiUrl + "users/userDelete?userId=" + userId;
    return this.httpClient.get<ResponseModel>(api)
  }

  getOperationClaimForUser(value: string, companyId:string):Observable<ListResponseModel<OperationClaimForUserListDto>>{
    let api = this.apiUrl + "users/getOperationClaimForUser?value=" + value + "&companyId=" + companyId;
    return this.httpClient.get<ListResponseModel<OperationClaimForUserListDto>>(api)
  }

  getTheme(userId:string):Observable<SingleResponseModel<UserThemeOption>>{
    let api = this.apiUrl + "users/getTheme?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<UserThemeOption>>(api)
  }

  changeTheme(userThemeOption:UserThemeOption):Observable<ResponseModel>{
    let api = this.apiUrl + "users/changeTheme";
    return this.httpClient.post<ResponseModel>(api,userThemeOption)
  }
}
