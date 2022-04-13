import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyPipe'
})
export class CompanyPipe implements PipeTransform {

  transform(value: any[], searchString:string){

    if (!searchString) {
      return value
    }

    return value.filter(i=> {
      const name = i.name.toLowerCase().toString().includes(searchString.toLowerCase())
      const address = i.address.toLowerCase().toString().includes(searchString.toLowerCase())
      return (name + address)
    })
  }

}
