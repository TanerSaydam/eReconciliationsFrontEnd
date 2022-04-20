import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountReconciliation } from '../models/accountReconciliationModel';
import { AccountReconciliationCountDto } from '../models/dtos/accountReconciliationCountDto';
import { AccountReconciliationDto } from '../models/dtos/accountReconciliationDto';
import { ReconciliationResultDto } from '../models/dtos/reconciliationResultDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/reponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AccountReconciliationService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient
  ) { }

  getlist(companyId: string):Observable<ListResponseModel<AccountReconciliationDto>>{
    let api = this.apiUrl + "AccountReconciliations/getlist?companyid=" + companyId;
    return this.httpClient.get<ListResponseModel<AccountReconciliationDto>>(api)
  }

  getById(id: number):Observable<SingleResponseModel<AccountReconciliation>>{
    let api = this.apiUrl + "AccountReconciliations/getById?id=" + id;
    return this.httpClient.get<SingleResponseModel<AccountReconciliation>>(api)
  }

  add(accountReconciliation:AccountReconciliation):Observable<ListResponseModel<AccountReconciliation>>{
    let api = this.apiUrl + "AccountReconciliations/add";
    return this.httpClient.post<ListResponseModel<AccountReconciliation>>(api,accountReconciliation)
  }

  update(accountReconciliation:AccountReconciliation):Observable<ListResponseModel<AccountReconciliation>>{
    let api = this.apiUrl + "AccountReconciliations/update";
    return this.httpClient.post<ListResponseModel<AccountReconciliation>>(api,accountReconciliation)
  }

  updateResult(accountReconciliation:AccountReconciliation):Observable<ListResponseModel<AccountReconciliation>>{
    let api = this.apiUrl + "AccountReconciliations/updateResult";
    return this.httpClient.post<ListResponseModel<AccountReconciliation>>(api,accountReconciliation)
  }

  delete(id:number):Observable<ListResponseModel<AccountReconciliation>>{
    let api = this.apiUrl + "AccountReconciliations/delete?id=" + id;
    return this.httpClient.get<ListResponseModel<AccountReconciliation>>(api)
  }

  getByCode(code: string):Observable<ListResponseModel<AccountReconciliation>>{
    let api = this.apiUrl + "AccountReconciliations/getByCode?code=" + code;
    return this.httpClient.get<ListResponseModel<AccountReconciliation>>(api)
  }

  getByCodeDto(code: string):Observable<SingleResponseModel<AccountReconciliationDto>>{
    let api = this.apiUrl + "AccountReconciliations/getByCodeDto?code=" + code;
    return this.httpClient.get<SingleResponseModel<AccountReconciliationDto>>(api)
  }

  getCount(companyId: string):Observable<SingleResponseModel<AccountReconciliationCountDto>>{
    let api = this.apiUrl + "AccountReconciliations/getCount?companyId=" + companyId;
    return this.httpClient.get<SingleResponseModel<AccountReconciliationCountDto>>(api)
  }

  sendResult(reconciliationResultDto: ReconciliationResultDto):Observable<ResponseModel>{
    let api = this.apiUrl + "AccountReconciliations/sendResult";
    return this.httpClient.post<ResponseModel>(api, reconciliationResultDto)
  }

  addFromExcel(file:any,companyId:string):Observable<ResponseModel>{
    let api = this.apiUrl + "AccountReconciliations/addFromExcel?companyId=" + companyId;

    const formData = new FormData;
    formData.append("file",file,file.name);

    return this.httpClient.post<ResponseModel>(api,formData);
  }

  sendReconciliationMail(id:number):Observable<ResponseModel>{
    let api = this.apiUrl + "AccountReconciliations/sendReconciliationMail?id=" + id;
    return this.httpClient.get<ResponseModel>(api)
  }
}
