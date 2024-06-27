import {FormControl, FormGroup} from "@angular/forms";

export interface DebugAttributes {
  body: number,
  mind: number,
  spirit: number,
}

export interface DebugSheet {
  playerName: string,
  characterName: string,
  characterPicture: string,
  attributes: DebugAttributes
}

export type DebugAttributesForm = {
  body: FormControl<number>,
  mind: FormControl<number>,
  spirit: FormControl<number>
}

export type DebugSheetForm = {
  playerName: FormControl<string>,
  characterName: FormControl<string>,
  characterPicture : FormControl<string>,
  attributes: FormGroup<DebugAttributesForm>
}
