import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Injectable, OnInit} from "@angular/core";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {DebugAttributesForm, DebugSheet, DebugSheetForm} from "./model/debug-sheet";
import {UserFull} from "../../../core/model/user.model";
import {AuthService} from "../../../core/services/auth.service";

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

  private get fb(){
    return this._fb.nonNullable;
  }


}
