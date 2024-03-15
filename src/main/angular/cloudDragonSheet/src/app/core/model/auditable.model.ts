import {BaseModel} from "./base.model";

export interface AuditableModel extends BaseModel{
  crDate:Date
  crUser:string,
  upDate?:Date,
  upUser?:string,
}
