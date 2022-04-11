import { Pipe, PipeTransform } from '@angular/core';
import { UserDto } from '../models/userDto';

@Pipe({
  name: 'userFilterPipe'
})
export class UserFilterPipe implements PipeTransform {

  transform(value: UserDto[], filterText:string): UserDto[] {
    return filterText?value.filter((p:UserDto)=> p.userIsActive.toString().toLowerCase().indexOf(filterText)!==-1):value;
  }

}
