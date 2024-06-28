import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {AM5VirtueForm} from "../../model/AM5-virtue.model";

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
}
