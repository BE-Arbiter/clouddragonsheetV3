import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValdemortDefaultComponent} from './components/valdemort-default/valdemort-default.component';
import {DefaultValidationErrorsDirective, ValidationErrorDirective, ValidationErrorsComponent} from "ngx-valdemort";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {BlockUIModule} from "primeng/blockui";
import {ProgressBarModule} from "primeng/progressbar";
import {DialogModule} from "primeng/dialog";
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";
import {LoginFormComponent} from './components/login-form/login-form.component';
import { SubscribeFormComponent } from './components/subscribe-form/subscribe-form.component';


const DECLARATIONS : any[] = [
  ValdemortDefaultComponent,
  ErrorPageComponent,
  LoginFormComponent,
  SubscribeFormComponent,
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
  CardModule,

  ReactiveFormsModule,
  RouterLink,
]
@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES],
  exports: [...MODULES,...DECLARATIONS]
})
export class SharedModule { }
