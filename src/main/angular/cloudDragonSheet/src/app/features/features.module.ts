import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminModule} from './admin/admin.module';
import {UserSheetsModule} from "./user-sheets/user-sheets.module";

export const FEATURES_ROUTES: Routes = [
  {
    path : '' ,
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  },
  {
    path : 'auth' ,
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path : 'user/sheets' ,
    loadChildren: () => import("./user-sheets/user-sheets.module").then(m => m.UserSheetsModule)
  },
  {
    path : 'admin' ,
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
  },
]


@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(FEATURES_ROUTES),
    AdminModule,
    UserSheetsModule
  ]
})
export class FeaturesModule { }
