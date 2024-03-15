import {FormControl} from "@angular/forms";

export interface Subscribe{
  username:string;
  email:string;
  password:string;
  passwordConfirmation:string;
  lastName:string;
  firstName:string;
}

export type SubscribeForm = {
  username:FormControl<string>;
  email:FormControl<string>;
  password:FormControl<string>;
  passwordConfirmation:FormControl<string>;
  lastName:FormControl<string>;
  firstName:FormControl<string>;
}
