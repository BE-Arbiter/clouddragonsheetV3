import {FormControl} from "@angular/forms";

export interface AM5GeneralData {
  tribunal: string;
  year: string;
  confidenceValue: number;
  confidencePoint: number;
  birthName: string;
  birthYear: string;
  birthPlace: string;
  occupation: string;
  sex: string;
  nationality: string;
  height: string;
  weight: string;
  hair: string;
  eyes: string;
  hand: string;
  size: number;
}

export type AM5GeneralDataForm = {
  tribunal: FormControl<string>;
  year: FormControl<string>;
  confidenceValue: FormControl<number>;
  confidencePoint: FormControl<number>;
  birthName: FormControl<string>;
  birthYear: FormControl<string>;
  birthPlace: FormControl<string>;
  occupation: FormControl<string>;
  sex: FormControl<string>;
  nationality: FormControl<string>;
  height: FormControl<string>;
  weight: FormControl<string>;
  hair: FormControl<string>;
  eyes: FormControl<string>;
  hand: FormControl<string>;
  size: FormControl<number>;
}
