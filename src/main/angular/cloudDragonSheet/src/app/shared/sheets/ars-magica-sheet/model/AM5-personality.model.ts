import {FormControl} from "@angular/forms";

export interface AM5Personality {
  name: string;
  value: number;
  type: string;
}

export type AM5PersonalityForm = {
  name: FormControl<string>;
  value: FormControl<number>;
  type: FormControl<string>;
}
