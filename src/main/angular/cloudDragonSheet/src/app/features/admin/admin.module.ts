import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UserEditFormComponent } from './user-edit-form/user-edit-form.component';



@NgModule({
  declarations: [
    UsersListComponent,
    UserEditFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
