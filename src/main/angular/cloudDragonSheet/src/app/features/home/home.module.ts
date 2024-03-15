import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {DashboardGuard} from "../../core/guards/dashboard.guard";
import { AcceuilComponent } from './acceuil/acceuil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {LoggedInGuard} from "../../core/guards/logged-in.guard";


export const FEATURES_ROUTES: Routes = [
  {path: '', canActivate : [DashboardGuard], component: AcceuilComponent},
  {path: 'dashboard',canActivate : [LoggedInGuard], component : DashboardComponent}
]

@NgModule({
  declarations: [
    AcceuilComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FEATURES_ROUTES),
    SharedModule,
  ]
})
export class HomeModule { }
