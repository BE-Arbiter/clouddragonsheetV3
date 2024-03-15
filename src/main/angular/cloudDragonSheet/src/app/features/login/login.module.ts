import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ValidationErrorsComponent} from "ngx-valdemort";


export const FEATURES_ROUTES: Routes = [
  {
    path : '' ,
    component : LoginComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FEATURES_ROUTES),
    SharedModule,
  ]
})
export class LoginModule { }
