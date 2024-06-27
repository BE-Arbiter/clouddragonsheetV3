import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ArsMagicaFormGroup, ArsMagicaSheet} from "../model/AM5-sheet.model";
import {ArsMagicaSheetManager} from "../ars-magica.sheet";
import {Sheet} from "../../../../core/model/sheet.model";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sheet-ars-magica',
  templateUrl: './sheet-ars-magica.component.html',
  styleUrl: './sheet-ars-magica.component.scss'
})
export class SheetArsMagicaComponent implements OnInit, OnChanges {
  @Input()
  public sheet!: Sheet;

  @Input()
  public formGroupSubject!: BehaviorSubject<FormGroup>;

  public formGroup!: FormGroup<ArsMagicaFormGroup>;

  constructor(
    private sheetManager: ArsMagicaSheetManager
  ) {
    this.formGroup = this.sheetManager.formGroup;
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["sheet"]) {
      let change = changes["sheet"] as SimpleChange;
      if (change.currentValue) {
        let sheet = change.currentValue;
        let data = JSON.parse(sheet.data) as ArsMagicaSheet;
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
