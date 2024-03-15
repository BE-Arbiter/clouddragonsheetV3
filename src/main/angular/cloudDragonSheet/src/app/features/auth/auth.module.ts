import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ValidationErrorsComponent} from "ngx-valdemort";
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ActivateComponent } from './activate/activate.component';


export const FEATURES_ROUTES: Routes = [
  { path : 'login' , component : LoginComponent },
  { path : 'subscribe' , component : SubscribeComponent},
]

@NgModule({
  declarations: [
    LoginComponent,
    SubscribeComponent,
    ActivateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FEATURES_ROUTES),
    SharedModule,
  ]
})
export class AuthModule { }
