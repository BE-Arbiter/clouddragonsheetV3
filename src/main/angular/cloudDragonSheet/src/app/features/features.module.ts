import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { AdminModule } from './admin/admin.module';

export const FEATURES_ROUTES: Routes = [
  {
    path : '' ,
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  },
  {
    path : 'auth' ,
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  }
]


@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(FEATURES_ROUTES),
    AdminModule
  ]
})
export class FeaturesModule { }
