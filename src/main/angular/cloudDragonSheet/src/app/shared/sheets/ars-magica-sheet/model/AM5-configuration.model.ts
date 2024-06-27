import {FormControl} from "@angular/forms";

export interface AM5Configuration {
  characterType: string;
  alternateCast: boolean;
  doCalculations: boolean;
  pictureZoom: boolean;
  pictureXOffset: number;
  pictureYOffset: number;
  pictureBackground: string;
  pictureOverlay: string;
}

export type AM5ConfigurationForm = {
  characterType: FormControl<string>;
  alternateCast: FormControl<boolean>;
  doCalculations: FormControl<boolean>;
  pictureZoom: FormControl<boolean>;
  pictureXOffset: FormControl<number>;
  pictureYOffset: FormControl<number>;
  pictureBackground: FormControl<string>;
  pictureOverlay: FormControl<string>;
}
