import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountReconciliationPipe'
})
export class AccountReconciliationPipe implements PipeTransform {

  transform(value: any[], searchString:string){

    if (!searchString) {
      return value
    }

    return value.filter(i=> {
      const accountCode = i.accountCode.toLowerCase().toString().includes(searchString.toLowerCase())
      const accountName = i.accountName.toLowerCase().toString().includes(searchString.toLowerCase())
      const accountEmail = i.accountEmail.toLowerCase().toString().includes(searchString.toLowerCase())
      return (accountCode + accountName + accountEmail)
    })
  }


}
