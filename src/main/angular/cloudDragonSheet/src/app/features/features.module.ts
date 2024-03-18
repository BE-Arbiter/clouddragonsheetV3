import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminModule} from './admin/admin.module';
import {UserSheetsModule} from "./user-sheets/user-sheets.module";
import {AdminGuard} from "../core/guards/admin.guard";
import {LoggedInGuard} from "../core/guards/logged-in.guard";

export const FEATURES_ROUTES: Routes = [
  {
    path : 'auth' ,
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path : 'user/sheets' ,
    canActivate : [LoggedInGuard],
    loadChildren: () => import("./user-sheets/user-sheets.module").then(m => m.UserSheetsModule)
  },
  {
    path : 'admin' ,
    canActivate : [AdminGuard],
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
  },
  {
    path : '' ,
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
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
