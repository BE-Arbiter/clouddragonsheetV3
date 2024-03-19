import {Component, Input, OnInit} from '@angular/core';
import {Sheet} from "../../../core/model/sheet.model";
import {GamesEnum} from "../../../core/enums/games.enum";
import {SheetsService} from "../../../core/services/sheets.service";

@Component({
  selector: 'app-sheets-handler',
  templateUrl: './sheets-handler.component.html',
  styleUrl: './sheets-handler.component.scss'
})
export class SheetsHandlerComponent implements OnInit{
  @Input()
  public sheetId! : number;
  public sheet! : Sheet;

  constructor(
    private sheetsService : SheetsService,
  ) {
  }

  ngOnInit(): void {
    this.sheetsService.get(this.sheetId).subscribe(value => {
      this.sheet = value;
      document.body.setAttribute('sheet-theme',this.sheet.game);
    });
  }

  public save():void{
    this.sheetsService.update(this.sheet).subscribe(value => {
      this.sheet = value;
      document.body.setAttribute('sheet-theme',this.sheet.game);
    });
  }

  public print():void{
    window.print();
  }

  public GAME_DEBUG_SHEET = GamesEnum.DEBUG_SHEET;
}
