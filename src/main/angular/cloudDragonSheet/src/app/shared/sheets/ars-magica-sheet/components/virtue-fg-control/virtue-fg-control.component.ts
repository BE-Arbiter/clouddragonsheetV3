import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {AM5VirtueForm} from "../../model/AM5-virtue.model";
import {UiService} from "../../../../../core/services/ui.service";
import {ConfirmationService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

@UntilDestroy()
@Component({
  selector: 'AM5-virtue-control',
  templateUrl: './virtue-fg-control.component.html',
  styleUrl: './virtue-fg-control.component.scss'
})
export class AM5VirtueFgControlComponent{
  @Input()
  public formGroup:FormGroup<AM5VirtueForm> | null = null;

  @Output()
  public onDeleteVirtue: EventEmitter<void> = new EventEmitter<void>;

  constructor(public ui : UiService,
              public translate : TranslateService,
              public confirmationService : ConfirmationService) {
  }

  public deleteVirtue(){
    this.confirmationService.confirm({
      message: this.translate.instant("common.confirm"),
      header: this.translate.instant("toast.warn"),
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptLabel:this.translate.instant("common.yes"),
      rejectLabel:this.translate.instant("common.no"),
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => { this.onDeleteVirtue.emit()}
    })
  }
}
