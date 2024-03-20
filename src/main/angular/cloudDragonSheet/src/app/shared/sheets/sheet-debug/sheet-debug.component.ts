import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Sheet} from "../../../core/model/sheet.model";
import {FormGroup} from "@angular/forms";
import {DebugSheet, DebugSheetForm, DebugSheetManager} from "../../../core/sheets/debug.sheet";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-sheet-debug',
  templateUrl: './sheet-debug.component.html',
  styleUrl: './sheet-debug.component.scss'
})
export class SheetDebugComponent implements OnInit, OnChanges {
  @Input()
  public sheet!: Sheet;

  @Input()
  public formGroupSubject!: BehaviorSubject<FormGroup>;

  public formGroup!: FormGroup<DebugSheetForm>;

  constructor(
    private sheetManager: DebugSheetManager
  ) {
    this.formGroup = this.sheetManager.formGroup;
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["sheet"]) {
      let change = changes["sheet"] as SimpleChange;
      if (change.currentValue) {
        let sheet = change.currentValue;
        let data = JSON.parse(sheet.data) as DebugSheet;
        data.characterName = !data.characterName ? sheet.characterName : data.characterName;
        data.playerName = (!data.playerName && this.formGroup.value.playerName) ? this.formGroup.value.playerName : data.playerName;
          this.formGroup.patchValue(data);
        if (this.formGroupSubject) {
          this.formGroupSubject.next(this.formGroup);
        }
      }
    }
    if (changes["formGroupSubject"]) {

      let change = changes["formGroupSubject"] as SimpleChange;
      if (change.currentValue && (change.firstChange || change.currentValue != change.previousValue)) {
        if (this.formGroup) {
          (change.currentValue as BehaviorSubject<FormGroup>).next(this.formGroup);
        }
      }
    }
  }
}
