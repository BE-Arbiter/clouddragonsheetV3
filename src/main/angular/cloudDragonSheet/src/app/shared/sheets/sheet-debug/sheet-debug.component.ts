import {Component, Input} from '@angular/core';
import {Sheet} from "../../../core/model/sheet.model";

@Component({
  selector: 'app-sheet-debug',
  templateUrl: './sheet-debug.component.html',
  styleUrl: './sheet-debug.component.scss'
})
export class SheetDebugComponent {
  @Input()
  public sheet! : Sheet;
}
