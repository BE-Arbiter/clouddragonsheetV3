import { Pipe, PipeTransform } from '@angular/core';
import {UsersService} from "../../core/services/users.service";
import {Observable} from "rxjs";

@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {

  constructor(
    private userservice : UsersService,
  ) {
  }

  transform(value: number): Observable<string> {
    return this.userservice.username(value)
  }

}
