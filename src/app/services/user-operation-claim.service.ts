import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { UserOperationClaim } from '../models/userOperationClaimModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient
  ) { }

  getlist(userId: string,companyId: string):Observable<ListResponseModel<UserOperationClaim>>{
    let api = this.apiUrl + "userOperationClaims/getListDto?userid=" + userId + "&companyid=" + companyId;
    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(api)
  }
}
