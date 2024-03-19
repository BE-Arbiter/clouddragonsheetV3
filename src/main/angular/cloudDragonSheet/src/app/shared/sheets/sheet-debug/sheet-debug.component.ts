import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Sheet} from "../../../core/model/sheet.model";
import {FormGroup} from "@angular/forms";
import {DebugSheet, DebugSheetForm, DebugSheetManager} from "../../../core/sheets/debug.sheet";

@Component({
  selector: 'app-sheet-debug',
  templateUrl: './sheet-debug.component.html',
  styleUrl: './sheet-debug.component.scss'
})
export class SheetDebugComponent implements OnInit,OnChanges{
  @Input()
  public sheet! : Sheet;

  public formGroup!:FormGroup<DebugSheetForm>;

  constructor(
    private sheetManager: DebugSheetManager
  ) {
    this.formGroup = this.sheetManager.formGroup;
  }
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes["sheet"]){
      let change = changes["sheet"] as SimpleChange;
      if(change.currentValue && (change.firstChange || change.currentValue != change.previousValue)){
        this.formGroup.patchValue(change.currentValue as DebugSheet);
      }
    }
  }
}
