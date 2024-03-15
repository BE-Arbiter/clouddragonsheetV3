import {AuditableModel} from "./auditable.model";

export interface User extends AuditableModel{
  username?: string
  email? : string
  firstName? : string
  lastName?:string
}

export interface UserFull extends User{
  roles : string[]

}
export interface UserAdmin extends UserFull{

}
