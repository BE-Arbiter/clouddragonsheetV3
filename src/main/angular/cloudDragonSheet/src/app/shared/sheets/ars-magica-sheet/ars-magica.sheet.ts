import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Injectable, OnInit} from "@angular/core";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {AM5CharacteristicForm, AM5CharacteristicsForm} from "./model/AM5-characteristics.model";
import {AM5GeneralDataForm} from "./model/AM5-general.model";
import {AM5VirtueForm} from "./model/AM5-virtue.model";
import {AM5AbilityForm} from "./model/AM5-ability.model";
import {ArsMagicaFormGroup, ArsMagicaSheet} from "./model/AM5-sheet.model";
import {AM5PersonalityForm} from "./model/AM5-personality.model";
import {UserFull} from "../../../core/model/user.model";
import {AuthService} from "../../../core/services/auth.service";

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class ArsMagicaSheetManager implements OnInit {

  private currentUser: UserFull | null = null;

  public constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser$.pipe(untilDestroyed(this)).subscribe(value => {
      this.currentUser = value;
    });
  }

  /* Public Methods and Getters */
  public get initialData(): ArsMagicaSheet {
    return {...this.formGroup.value} as ArsMagicaSheet;
  }

  public get formGroup(): FormGroup<ArsMagicaFormGroup> {
    const username: string = (this.currentUser && this.currentUser.username) ? this.currentUser.username : "";
    return this.fb.group<ArsMagicaFormGroup>({
      playerName: this.fb.control(username, Validators.required),
      characterName: this.fb.control("", Validators.required),
      characterPicture: this.fb.control("", Validators.required),
      gameName: this.fb.control("", Validators.required),
      general: this.generalDataForm,

      characteristics: this.characteriticsForm,

      virtues: this.fb.array<FormGroup<AM5VirtueForm>>([]),
      flaws: this.fb.array<FormGroup<AM5VirtueForm>>([]),
      virtueFlawBalance: this.fb.control(0),

      abilities: this.fb.array<FormGroup<AM5AbilityForm>>([]),
      personalities: this.fb.array<FormGroup<AM5PersonalityForm>>([]),
      reputations: this.fb.array<FormGroup<AM5PersonalityForm>>([]),
    });
  }
  public addVirtue(fg : FormGroup<ArsMagicaFormGroup>):FormGroup<ArsMagicaFormGroup>{
    fg.controls.virtues.push(this.virtueForm);
    return fg;
  }

  public addFlaw(fg : FormGroup<ArsMagicaFormGroup>):FormGroup<ArsMagicaFormGroup>{
    fg.controls.flaws.push(this.virtueForm);
    return fg;
  }
  public removeVirtueAt(fg:FormGroup<ArsMagicaFormGroup>,index:number):FormGroup<ArsMagicaFormGroup>{
    if(fg.controls.virtues.length > index){
      fg.controls.virtues.removeAt(index);
    }
    return fg;
  }
  public removeFlawAt(fg:FormGroup<ArsMagicaFormGroup>,index:number):FormGroup<ArsMagicaFormGroup>{
    if(fg.controls.flaws.length > index){
      fg.controls.flaws.removeAt(index);
    }
    return fg;
  }

  public addAbility(fg : FormGroup<ArsMagicaFormGroup>):FormGroup<ArsMagicaFormGroup>{
    fg.controls.abilities.push(this.abilityForm);
    return fg;
  }

  public removeAbilityAt(fg:FormGroup<ArsMagicaFormGroup>,index:number):FormGroup<ArsMagicaFormGroup>{
    if(fg.controls.abilities.length > index){
      fg.controls.abilities.removeAt(index);
    }
    return fg;
  }

  //Private Helpers
  private get abilityForm(): FormGroup<AM5AbilityForm>{
    return this.fb.group<AM5AbilityForm>({
      name:this.fb.control(""),
      value:this.fb.control(0),
      experience:this.fb.control(0),
      notes:this.fb.control(""),
      specialty:this.fb.control(""),
    })
  }
  private get virtueForm(): FormGroup<AM5VirtueForm>{
    return this.fb.group<AM5VirtueForm>({
      cost: this.fb.control(0),
      category:this.fb.control(""),
      name:this.fb.control(""),
      type:this.fb.control(""),
    })
  }

  private get generalDataForm(): FormGroup<AM5GeneralDataForm> {
    return this.fb.group<AM5GeneralDataForm>({
      tribunal: this.fb.control(""),
      year: this.fb.control(""),
      confidenceValue: this.fb.control(0),
      confidencePoint: this.fb.control(0),
      birthName: this.fb.control(""),
      birthYear: this.fb.control(""),
      birthPlace: this.fb.control(""),
      occupation: this.fb.control(""),
      religion: this.fb.control(""),
      sex: this.fb.control(""),
      nationality: this.fb.control(""),
      height: this.fb.control(""),
      weight: this.fb.control(""),
      hair: this.fb.control(""),
      eyes: this.fb.control(""),
      hand: this.fb.control(""),
      size: this.fb.control(0)
    })
  }

  private get characteristicForm(): FormGroup<AM5CharacteristicForm> {
    return this.fb.group<AM5CharacteristicForm>({
      note: this.fb.control(""),
      value: this.fb.control(0)
    });
  }

  private get characteriticsForm(): FormGroup<AM5CharacteristicsForm> {
    return this.fb.group<AM5CharacteristicsForm>({
      dexterity: this.characteristicForm,
      communication: this.characteristicForm,
      endurance: this.characteristicForm,
      presence: this.characteristicForm,
      intelligence: this.characteristicForm,
      perception: this.characteristicForm,
      vivacity: this.characteristicForm,
      strength: this.characteristicForm,
    });
  }

  private get fb() {
    return this._fb.nonNullable;
  }


}
