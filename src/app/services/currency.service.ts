import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from '../models/currency';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

constructor(
  @Inject("apiUrl") private apiUrl:string,
  private httpClient:HttpClient
) { }

getlist():Observable<ListResponseModel<Currency>>{
  let api = this.apiUrl + "currencies/getlist";
  return this.httpClient.get<ListResponseModel<Currency>>(api)
}

}
