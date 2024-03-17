import {AuditableModel} from "./auditable.model";
import {FormControl} from "@angular/forms";

export interface Sheet extends AuditableModel{
  ownerId:number,
  characterName:string,
  game:string,
  data:string,
  readonly:boolean
}

export type SheetForm= {
  game: FormControl<string>
}
