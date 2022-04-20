import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MailParameter } from '../models/mailParameterModel';
import { ResponseModel } from '../models/reponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class MailParameterService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient
  ) { }

  getById(id:string):Observable<SingleResponseModel<MailParameter>>{
    let api = this.apiUrl + "MailParameter/getById?id=" + id;
    return this.httpClient.get<SingleResponseModel<MailParameter>>(api);
  }

  connectionTest(id:string):Observable<ResponseModel>{
    let api = this.apiUrl + "MailParameter/connectionTest?companyId=" + id;
    return this.httpClient.get<ResponseModel>(api);
  }

  update(mailParameter:MailParameter):Observable<ResponseModel>{
    let api = this.apiUrl + "MailParameter/update";
    return this.httpClient.post<ResponseModel>(api,mailParameter);
  }
}
