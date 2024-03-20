import {Component, Input, OnInit} from '@angular/core';
import {Sheet} from "../../../core/model/sheet.model";
import {GamesEnum} from "../../../core/enums/games.enum";
import {SheetsService} from "../../../core/services/sheets.service";
import {BehaviorSubject} from "rxjs";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sheets-handler',
  templateUrl: './sheets-handler.component.html',
  styleUrl: './sheets-handler.component.scss'
})
export class SheetsHandlerComponent implements OnInit{
  @Input()
  public sheetId! : number;

  public sheet! : Sheet;
  public formGroupSubject : BehaviorSubject<FormGroup> =  new BehaviorSubject<FormGroup>(new FormGroup<any>({}));

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
    let data = this.formGroupSubject.value.value;
    if(data['characterName']){
      this.sheet.characterName = data['characterName'];
    }
    this.sheet.data = JSON.stringify(data);
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
