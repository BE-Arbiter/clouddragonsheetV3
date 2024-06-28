import {Component, Input} from '@angular/core';

@Component({
  selector: 'sheet-page',
  templateUrl: './page-sheet.component.html',
  styleUrl: './page-sheet.component.scss'
})
export class PageSheetComponent {
  @Input()
  public pageNumber : string = null;
  @Input()
  public showContent = true;
}
