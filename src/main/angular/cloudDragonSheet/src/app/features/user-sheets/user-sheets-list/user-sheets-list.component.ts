import {Component, OnInit} from '@angular/core';
import {UiService} from "../../../core/services/ui.service";
import {SheetsService} from "../../../core/services/sheets.service";
import {Sheet} from "../../../core/model/sheet.model";
import {TranslateService} from "@ngx-translate/core";
import {Column} from "../../../core/model/column.model";

@Component({
  selector: 'app-user-sheets-list',
  templateUrl: './user-sheets-list.component.html',
  styleUrl: './user-sheets-list.component.scss'
})
export class UserSheetsListComponent implements OnInit {

  public sheets: Sheet[] = [];
  public cols : Column[] = [];

  constructor(
    private uiService: UiService,
    private translate : TranslateService,
    private sheetService: SheetsService
  ) {
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


  public newSheet():void{
    this.uiService.warn(this.translate.instant("errors.notImplemented"));
  }

  public getString(sheet:Sheet){
    return JSON.stringify(sheet);
  }

}
