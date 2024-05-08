import {FormControl, FormGroup} from "@angular/forms";

export interface AM5Ability {
  experience: number;
  name: string;
  specialty: string;
  value: number;
  notes: string;
}

export type AM5AbilityForm = {
  experience: FormControl<number>;
  name: FormControl<string>;
  specialty: FormControl<string>;
  value: FormControl<number>;
  notes: FormControl<string>;
}
}
