import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserSheetsListComponent} from './user-sheets-list/user-sheets-list.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { UserSheetsEditComponent } from './user-sheets-edit/user-sheets-edit.component';
import {UserSheetEditFormComponent} from "./user-sheet-edit-form/user-sheet-edit-form.component";


export const FEATURES_ROUTES: Routes = [
  {path: 'user/sheets/list', component: UserSheetsListComponent, pathMatch : "full"},
  {path: 'user/sheets/:id', component: UserSheetsEditComponent, pathMatch : "full"},
]

@NgModule({
  declarations: [
    UserSheetsListComponent,
    UserSheetsEditComponent,
    UserSheetEditFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FEATURES_ROUTES),
    SharedModule
  ]
})
export class UserSheetsModule { }
