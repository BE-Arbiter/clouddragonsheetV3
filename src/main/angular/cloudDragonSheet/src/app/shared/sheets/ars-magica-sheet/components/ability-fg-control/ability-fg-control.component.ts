import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {UiService} from "../../../../../core/services/ui.service";
import {ConfirmationService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {AM5AbilityForm} from "../../model/AM5-ability.model";

@UntilDestroy()
@Component({
  selector: 'AM5-ability-control',
  templateUrl: './ability-fg-control.component.html',
  styleUrl: './ability-fg-control.component.scss'
})
export class AM5AbilityFgControlComponent{
  @Input()
  public formGroup:FormGroup<AM5AbilityForm> | null = null;

  @Output()
  public onDeleteAbility: EventEmitter<void> = new EventEmitter<void>;

  constructor(public ui : UiService,
              public translate : TranslateService,
              public confirmationService : ConfirmationService) {
  }

  public deleteAbility(){
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
      accept: () => { this.onDeleteAbility.emit()}
    })
  }
}
