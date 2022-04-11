import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userPipe'
})
export class UserPipe implements PipeTransform {

  transform(value: any[], searchString:string){

    if (!searchString) {
      return value
    }

    return value.filter(i=> {
      const name = i.name.toLowerCase().toString().includes(searchString.toLowerCase())
      const email = i.email.toLowerCase().toString().includes(searchString.toLowerCase())
      return (name + email)
    })
  }

}
