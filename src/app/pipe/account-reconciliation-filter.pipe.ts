import { Pipe, PipeTransform } from '@angular/core';
import { AccountReconciliationDto } from '../models/dtos/accountReconciliationDto';

@Pipe({
  name: 'accountReconciliationFilterPipe'
})
export class AccountReconciliationFilterPipe implements PipeTransform {

  transform(value: AccountReconciliationDto[], filterText:string): AccountReconciliationDto[] {
    return filterText?value.filter((p:AccountReconciliationDto)=> p.isResultSucceed.toString().toLowerCase().indexOf(filterText)!==-1):value;
  }

}
