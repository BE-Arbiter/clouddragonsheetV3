import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValdemortDefaultComponent } from './components/valdemort-default/valdemort-default.component';
import {DefaultValidationErrorsDirective, ValidationErrorDirective} from "ngx-valdemort";
import {TranslateModule} from "@ngx-translate/core";
import {RouterOutlet} from "@angular/router";


const MODULES : any[] = [
  CommonModule,
  DefaultValidationErrorsDirective,
  ValidationErrorDirective,
  TranslateModule,
  RouterOutlet
]
@NgModule({
  declarations: [
    ValdemortDefaultComponent
  ],
  imports: [...MODULES],
  exports: [...MODULES]
})
export class SharedModule { }
