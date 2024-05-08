import {FormControl} from "@angular/forms";

export interface AM5Virtue {
  name: string;
  type: string;
  category: string;
  cost: number;
}

export type AM5VirtueForm = {
  name: FormControl<string>,
  type: FormControl<string>,
  category: FormControl<string>,
  cost: FormControl<number>
}
