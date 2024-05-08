import {FormControl, FormGroup} from "@angular/forms";

export interface AM5Characteristic {
  note: string;
  value: number;
}

export interface AM5Characteristics {
  intelligence: AM5Characteristic;
  perception: AM5Characteristic;
  strength: AM5Characteristic;
  endurance: AM5Characteristic;
  presence: AM5Characteristic;
  communication: AM5Characteristic;
  dexterity: AM5Characteristic;
  vivacity: AM5Characteristic;
}


export interface AM5CharacteristicForm {
  note: FormControl<string>;
  value: FormControl<number>;
}

export interface AM5CharacteristicsForm {
  intelligence: FormGroup<AM5CharacteristicForm>;
  perception: FormGroup<AM5CharacteristicForm>;
  strength: FormGroup<AM5CharacteristicForm>;
  endurance: FormGroup<AM5CharacteristicForm>;
  presence: FormGroup<AM5CharacteristicForm>;
  communication: FormGroup<AM5CharacteristicForm>;
  dexterity: FormGroup<AM5CharacteristicForm>;
  vivacity: FormGroup<AM5CharacteristicForm>;
}
