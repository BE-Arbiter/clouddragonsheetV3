import {Component, OnInit} from '@angular/core';
import {UiService} from "../../../core/services/ui.service";
import {SheetsService} from "../../../core/services/sheets.service";
import {Sheet, SheetForm} from "../../../core/model/sheet.model";
import {TranslateService} from "@ngx-translate/core";
import {Column} from "../../../core/model/column.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GamesEnum} from "../../../core/enums/games.enum";
import {DebugSheetManager} from "../../../core/sheets/debug.sheet";
import {take} from "rxjs";

@Component({
  selector: 'app-user-sheets-list',
  templateUrl: './user-sheets-list.component.html',
  styleUrl: './user-sheets-list.component.scss'
})
export class UserSheetsListComponent implements OnInit {

  public sheets: Sheet[] = [];
  public cols: Column[] = [];

  /*Pour La création de la fiche */
  public showModal: boolean = false;
  public sheetFormGroup!: FormGroup<SheetForm>;

  constructor(
    private uiService: UiService,
    fb: FormBuilder,
    private translate: TranslateService,
    private sheetService: SheetsService,
    //Sheets Managers
    private debugSheetManager: DebugSheetManager,
  ) {
    this.sheetFormGroup = fb.group<SheetForm>({
      id: fb.control(null),
      characterName: fb.nonNullable.control("", [Validators.required, Validators.maxLength(64)]),
      game: fb.nonNullable.control("", Validators.required),
    });
  }

  ngOnInit(): void {
    this.sheetService.list().subscribe(value => this.sheets = value);

    this.cols = [
      {
        field: 'game',
        header: this.translate.instant("sheet.game"),
        type: "GameEnum",
      },
      {
        field: 'characterName',
        header: this.translate.instant("sheet.characterName"),
        type: "text",
      },
      {
        field: 'ownerId',
        header: this.translate.instant("sheet.owner"),
        type: "User",
      },
    ];
  }


  public saveSheet(): void {
    let sheet: Sheet = {...this.sheetFormGroup.value} as Sheet;
    switch (sheet.game) {
      case GamesEnum.DEBUG_SHEET:
        sheet.data = JSON.stringify(this.debugSheetManager.initialData);
        break;
      case GamesEnum.ARS_MAGICA_5TH:
        sheet.data = JSON.stringify({});
    }
    if (sheet.id) {
      this.sheetService.update(sheet).pipe(take(1)).subscribe(value => {
        this.sheets = this.sheets.filter(value1 => value1.id != value.id);
        this.sheets.push(value);
        this.sheetFormGroup.reset();
        this.uiService.success(this.translate.instant("common.saved"));
        this.closeModal();
      });
      return;
    } else {
      this.sheetService.create(sheet).pipe(take(1)).subscribe(value => {
        this.sheets.push(value);
        this.sheetFormGroup.reset();
        this.uiService.success(this.translate.instant("common.created"));
        this.closeModal();
      });
      return;
    }
  }

  public newSheet(): void {
    this.sheetFormGroup.reset();
    this.showModal = true;
  }

  public closeModal(): void {
    this.sheetFormGroup.reset();
    this.showModal = false;
  }

}
