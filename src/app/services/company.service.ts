import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/companyModel';
import { CompanyDto } from '../models/dtos/companyDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/reponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient,
  ) { }

  getCompanyListByUserid(userId: string):Observable<ListResponseModel<Company>>{
    let api = this.apiUrl + "companies/getCompanyListByUserid?userId=" + userId;
    return this.httpClient.get<ListResponseModel<Company>>(api)
  }

  getCompany(companyId: number):Observable<SingleResponseModel<Company>>{
    let api = this.apiUrl + "companies/getCompany?companyId=" + companyId;
    return this.httpClient.get<SingleResponseModel<Company>>(api)
  }

  addCompany(company: CompanyDto):Observable<ResponseModel>{
    let api = this.apiUrl + "companies/addCompanyAndUserCompany";
    return this.httpClient.post<ResponseModel>(api,company)
  }

  changeStatusCompany(company: Company):Observable<ResponseModel>{
    let api = this.apiUrl + "companies/changeStatusCompany";
    return this.httpClient.post<ResponseModel>(api,company)
  }

  updateCompany(company: Company):Observable<ResponseModel>{
    let api = this.apiUrl + "companies/updateCompany";
    return this.httpClient.post<ResponseModel>(api,company)
  }
}
