import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Sheet} from "../../../core/model/sheet.model";
import {GamesEnum} from "../../../core/enums/games.enum";
import {SheetsService} from "../../../core/services/sheets.service";
import {BehaviorSubject} from "rxjs";
import {FormGroup} from "@angular/forms";
import {UiService} from "../../../core/services/ui.service";

@Component({
  selector: 'app-sheets-handler',
  templateUrl: './sheets-handler.component.html',
  styleUrl: './sheets-handler.component.scss'
})
export class SheetsHandlerComponent implements OnInit{
  @Input()
  public sheetId! : number;

  public onConfigure : EventEmitter<void> = new EventEmitter<void>();

  public sheet! : Sheet;
  public formGroupSubject : BehaviorSubject<FormGroup> =  new BehaviorSubject<FormGroup>(new FormGroup<any>({}));

  constructor(
    private sheetsService : SheetsService,
    private ui: UiService,
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
      this.ui.success("common.saved")
    });
  }

  public print():void{
    window.print();
  }

  public configure():void{
    this.onConfigure.emit();
  }

  public gameEnums = GamesEnum;
}
