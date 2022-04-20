import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyAccount } from '../models/currencyAccountModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/reponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CurrencyAccountService {

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient:HttpClient
  ) { }

  getlist(companyId: string):Observable<ListResponseModel<CurrencyAccount>>{
    let api = this.apiUrl + "currencyaccounts/getlist?companyid=" + companyId;
    return this.httpClient.get<ListResponseModel<CurrencyAccount>>(api)
  }

  getbyid(id: number):Observable<SingleResponseModel<CurrencyAccount>>{
    let api = this.apiUrl + "currencyaccounts/getbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<CurrencyAccount>>(api)
  }

  add(currencyAccount: CurrencyAccount):Observable<ResponseModel>{
    let api = this.apiUrl + "currencyaccounts/add";
    return this.httpClient.post<ResponseModel>(api,currencyAccount);
  }

  update(currencyAccount: CurrencyAccount):Observable<ResponseModel>{
    let api = this.apiUrl + "currencyaccounts/update";
    return this.httpClient.post<ResponseModel>(api,currencyAccount);
  }

  delete(currencyAccount: CurrencyAccount):Observable<ResponseModel>{
    let api = this.apiUrl + "currencyaccounts/delete";
    return this.httpClient.post<ResponseModel>(api,currencyAccount);
  }

  addFromExcel(file:any,companyId:string):Observable<ResponseModel>{
    let api = this.apiUrl + "currencyaccounts/addFromExcel?companyId=" + companyId;

    const formData = new FormData;
    formData.append("file",file,file.name);

    return this.httpClient.post<ResponseModel>(api,formData);
  }


}
