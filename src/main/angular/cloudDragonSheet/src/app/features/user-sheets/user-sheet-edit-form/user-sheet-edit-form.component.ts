import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {SheetForm} from "../../../core/model/sheet.model";
import {GamesEnum} from "../../../core/enums/games.enum";
import {AuthService} from "../../../core/services/auth.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {RolesEnum} from "../../../core/enums/roles.enum";

@UntilDestroy()
@Component({
  selector: 'app-user-sheet-edit-form',
  templateUrl: './user-sheet-edit-form.component.html',
  styleUrl: './user-sheet-edit-form.component.scss'
})
export class UserSheetEditFormComponent implements OnInit {

  @Input()
  public sheetFormGroup!: FormGroup<SheetForm>;


  public games: any[] = [];

  constructor(
    public auth : AuthService,
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.auth.currentUser$.pipe(untilDestroyed(this)).subscribe(value => {
      this.games = [];
      if(value?.roles?.includes(RolesEnum.ROLE_ADMIN)) {
        this.games.push({label: this.translate.instant("game." + GamesEnum.DEBUG_SHEET),value:GamesEnum.DEBUG_SHEET});
      }
      this.games.push({label: this.translate.instant("game." + GamesEnum.ARS_MAGICA_5TH),value:GamesEnum.ARS_MAGICA_5TH});
    })

  }

}
