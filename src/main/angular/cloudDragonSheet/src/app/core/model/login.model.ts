import {FormControl} from "@angular/forms";

export interface Login{
  username:string,
  password:string
}

export type LoginForm = {
  username : FormControl<string>,
  password : FormControl<string>
}
