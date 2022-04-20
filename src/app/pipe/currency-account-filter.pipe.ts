import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyAccount } from '../models/currencyAccountModel';

@Pipe({
  name: 'currencyAccountFilterPipe'
})
export class CurrencyAccountFilterPipe implements PipeTransform {

  transform(value: CurrencyAccount[], filterText:string): CurrencyAccount[] {
    return filterText?value.filter((p:CurrencyAccount)=> p.isActive.toString().toLowerCase().indexOf(filterText)!==-1):value;
  }

}
