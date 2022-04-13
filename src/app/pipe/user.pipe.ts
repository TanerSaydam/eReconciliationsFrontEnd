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
      const name = i.userUserName.toLowerCase().toString().includes(searchString.toLowerCase())
      const email = i.userMail.toLowerCase().toString().includes(searchString.toLowerCase())
      return (name + email)
    })
  }

}
