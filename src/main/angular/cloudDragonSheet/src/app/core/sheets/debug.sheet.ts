import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Injectable, OnInit} from "@angular/core";
import {UserFull} from "../model/user.model";
import {AuthService} from "../services/auth.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

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

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class DebugSheetManager implements OnInit {

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

  public get initialData():DebugSheet{
    return {...this.formGroup.value} as DebugSheet;
}

  public get formGroup(): FormGroup<DebugSheetForm> {
    const username:string = (this.currentUser && this.currentUser.username) ? this.currentUser.username : "";
    return this.fb.group<DebugSheetForm>({
      playerName: this.fb.control(username,Validators.required),
      characterName: this.fb.control("",Validators.required),
      characterPicture: this.fb.control("",Validators.required),
      attributes: this.attributeFormGroup
    });
  }

  private get attributeFormGroup(): FormGroup<DebugAttributesForm> {
    return this.fb.group<DebugAttributesForm>({
      body : this.fb.control(2,Validators.required),
      mind : this.fb.control(2,Validators.required),
      spirit : this.fb.control(2,Validators.required),
    })
  }

  public get fb(){
    return this._fb.nonNullable;
  }


}
