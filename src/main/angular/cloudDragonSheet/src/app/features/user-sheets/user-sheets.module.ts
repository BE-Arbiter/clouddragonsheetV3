import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserSheetsListComponent} from './user-sheets-list/user-sheets-list.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";


export const FEATURES_ROUTES: Routes = [
  {path: 'list', component: UserSheetsListComponent},
]

@NgModule({
  declarations: [
    UserSheetsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FEATURES_ROUTES),
    SharedModule
  ]
})
export class UserSheetsModule { }
