import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValdemortDefaultComponent } from './components/valdemort-default/valdemort-default.component';
import {DefaultValidationErrorsDirective, ValidationErrorDirective} from "ngx-valdemort";
import {TranslateModule} from "@ngx-translate/core";
import {RouterOutlet} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {BlockUIModule} from "primeng/blockui";
import {ProgressBarModule} from "primeng/progressbar";


const DECLARATIONS : any[] = [
  ValdemortDefaultComponent,
]

const MODULES : any[] = [
  CommonModule,
  DefaultValidationErrorsDirective,
  ValidationErrorDirective,
  TranslateModule,
  RouterOutlet,
  ToastModule,
  ButtonModule,
  BlockUIModule,
  ProgressBarModule,
]
@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...MODULES,...DECLARATIONS]
})
export class SharedModule { }
