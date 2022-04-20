import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MailTemplate } from '../models/mailTemplateModel';
import { ResponseModel } from '../models/reponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class MailTemplateService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient
  ) { }

  getByCompanyId(companyId:string):Observable<SingleResponseModel<MailTemplate>>{
    let api = this.apiUrl + "Mailtemplates/getByCompanyId?companyId=" + companyId;
    return this.httpClient.get<SingleResponseModel<MailTemplate>>(api);
  }

  update(mailTemplate:MailTemplate):Observable<ResponseModel>{
    let api = this.apiUrl + "Mailtemplates/update";
    return this.httpClient.post<ResponseModel>(api,mailTemplate);
  }
}
