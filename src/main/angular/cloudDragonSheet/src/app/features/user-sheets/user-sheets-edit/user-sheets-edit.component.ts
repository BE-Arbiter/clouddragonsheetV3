import {Component, OnInit} from '@angular/core';
import {SheetsService} from "../../../core/services/sheets.service";
import {Sheet} from "../../../core/model/sheet.model";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

@Component({
  selector: 'app-user-sheets-edit',
  templateUrl: './user-sheets-edit.component.html',
  styleUrl: './user-sheets-edit.component.scss'
})
export class UserSheetsEditComponent implements OnInit{
  public sheetId! : number;

  constructor(
    private route : ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    this.sheetId = this.route.snapshot.params['id'];
  }


  public getString(sheet:Sheet){
    return JSON.stringify(sheet);
  }

}
