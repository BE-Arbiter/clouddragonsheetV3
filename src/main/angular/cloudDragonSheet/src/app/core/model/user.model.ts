import {AuditableModel} from "./auditable.model";
import {BaseModel} from "./base.model";

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

}
