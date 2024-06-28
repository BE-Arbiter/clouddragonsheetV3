import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {AM5GeneralData, AM5GeneralDataForm} from "./AM5-general.model";
import {AM5Characteristics, AM5CharacteristicsForm} from "./AM5-characteristics.model";
import {AM5Virtue, AM5VirtueForm} from "./AM5-virtue.model";
import {AM5Configuration, AM5ConfigurationForm} from "./AM5-configuration.model";
import {AM5Ability, AM5AbilityForm} from "./AM5-ability.model";
import {AM5Personality, AM5PersonalityForm} from "./AM5-personality.model";

export interface ArsMagicaSheet {
  playerName: string,
  characterName: string,
  characterPicture: string,
  gameName: string

  configuration : AM5Configuration;
  general: AM5GeneralData;

  characteristics: AM5Characteristics;

  virtues: AM5Virtue[];
  flaws: AM5Virtue[];
  virtueFlawBalance: number;

  abilities: AM5Ability[];

  personalities: AM5Personality[];
  reputations: AM5Personality[];
}

export type ArsMagicaFormGroup = {
  playerName: FormControl<string>,
  characterName: FormControl<string>,
  characterPicture: FormControl<string>,
  gameName: FormControl<string>,

  general: FormGroup<AM5GeneralDataForm>;

  characteristics: FormGroup<AM5CharacteristicsForm>;

  virtues: FormArray<FormGroup<AM5VirtueForm>>,
  flaws: FormArray<FormGroup<AM5VirtueForm>>,
  virtueFlawBalance: FormControl<number>,

  configuration: FormGroup<AM5ConfigurationForm>,

  abilities: FormArray<FormGroup<AM5AbilityForm>>;

  personalities: FormArray<FormGroup<AM5PersonalityForm>>
  reputations: FormArray<FormGroup<AM5PersonalityForm>>
}
