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
import {SubscribeFormComponent} from './components/subscribe-form/subscribe-form.component';
import {TableModule} from "primeng/table";
import {BadgeModule} from "primeng/badge";
import {SelectButtonModule} from "primeng/selectbutton";
import {MultiSelectModule} from "primeng/multiselect";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {UsernamePipe} from './pipes/username.pipe';
import {SheetsHandlerComponent} from './sheets/sheets-handler/sheets-handler.component';
import {SheetDebugComponent} from './sheets/sheet-debug/sheet-debug.component';
import {DropdownModule} from "primeng/dropdown";
import { SharedPictureComponent } from './sheets/shared-picture/shared-picture.component';
import {DragDropModule} from "primeng/dragdrop";
import {FileUploadModule} from "primeng/fileupload";

const SHEETS : any[] = [
  SheetsHandlerComponent,
  SheetDebugComponent,
]

const DECLARATIONS : any[] = [
  ValdemortDefaultComponent,
  ErrorPageComponent,
  LoginFormComponent,
  SubscribeFormComponent,
  SharedPictureComponent,

  //Pipes
  UsernamePipe,
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
  TableModule,
  BadgeModule,
  SelectButtonModule,
  MultiSelectModule,
  ConfirmDialogModule,
  DropdownModule,
  DragDropModule,
  FileUploadModule,

  ReactiveFormsModule,
  RouterLink,
]
@NgModule({
  declarations: [...DECLARATIONS, ...SHEETS],
  imports: [...MODULES],
  exports: [...MODULES,...DECLARATIONS,...SHEETS]
})
export class SharedModule { }
