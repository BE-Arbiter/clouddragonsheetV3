import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValdemortDefaultComponent } from './components/valdemort-default/valdemort-default.component';
import {DefaultValidationErrorsDirective, ValidationErrorDirective, ValidationErrorsComponent} from "ngx-valdemort";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {BlockUIModule} from "primeng/blockui";
import {ProgressBarModule} from "primeng/progressbar";
import {Dialog, DialogModule} from "primeng/dialog";
import { ErrorPageComponent } from './components/error-page/error-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";


const DECLARATIONS : any[] = [
  ValdemortDefaultComponent,
]

const MODULES : any[] = [
  CommonModule,
  DefaultValidationErrorsDirective,
  ValidationErrorDirective,
  ValidationErrorsComponent,
  TranslateModule,
  RouterOutlet,
  ToastModule,
  ButtonModule,
  BlockUIModule,
  ProgressBarModule,
  DialogModule,
  InputTextModule,

  ReactiveFormsModule,
  RouterLink,
]
@NgModule({
  declarations: [...DECLARATIONS, ErrorPageComponent],
  imports: [...MODULES],
  exports: [...MODULES,...DECLARATIONS]
})
export class SharedModule { }
