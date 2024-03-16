import {AuditableModel} from "./auditable.model";
import {BaseModel} from "./base.model";
import {FormControl} from "@angular/forms";

export interface User extends BaseModel {
  username?: string
  email? : string
  firstName? : string
  lastName?:string
}

export interface UserFull extends User{
  roles : string[]

}
export interface UserAdmin extends UserFull,AuditableModel{
  activated : boolean
  password? : string;
}

export type UserAdminForm = {
  id? : FormControl<number | null>
  username : FormControl<string>
  email : FormControl<string>
  firstName : FormControl<string>
  lastName : FormControl<string>
  activated : FormControl<boolean>
  password : FormControl<string>
  roles : FormControl<string[]>
}
