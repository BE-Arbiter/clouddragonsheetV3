import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UserEditFormComponent } from './user-edit-form/user-edit-form.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";

const ROUTES : Routes = [
  { path : "admin/users/list" , component : UsersListComponent}
]

@NgModule({
  declarations: [
    UsersListComponent,
    UserEditFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
  ]
})
export class AdminModule { }
