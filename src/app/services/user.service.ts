import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/reponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UserDto } from '../models/userDto';
import { UserForRegisterToSecondAccountDto } from '../models/userForRegisterToSecondAccountDto';

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
}
