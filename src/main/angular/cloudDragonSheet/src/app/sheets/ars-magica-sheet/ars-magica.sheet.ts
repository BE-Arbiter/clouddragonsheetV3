import {FormGroup, Validators} from "@angular/forms";
import {Injectable, OnInit} from "@angular/core";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {AM5VirtueForm} from "./model/AM5-virtue.model";
import {UserFull} from "../../core/model/user.model";
import {AuthService} from "../../core/services/auth.service";
import {ArsMagicaFormGroup, ArsMagicaSheet} from "./model/AM5-sheet.model";
import {ArsMagicaFormManager} from "./ars-magica.form";

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class ArsMagicaSheetManager implements OnInit {

  private currentUser: UserFull | null = null;

  public constructor(
    private authService: AuthService,
    private formManager: ArsMagicaFormManager
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser$.pipe(untilDestroyed(this)).subscribe(value => {
      this.currentUser = value;
    });
  }

  public get initialData(): ArsMagicaSheet {
    return {...this.formGroup.value} as ArsMagicaSheet;
  }

  public get formGroup(): FormGroup<ArsMagicaFormGroup> {
    const username: string = (this.currentUser && this.currentUser.username) ? this.currentUser.username : "";
    return this.formManager.getformGroup(username)
  }


}
