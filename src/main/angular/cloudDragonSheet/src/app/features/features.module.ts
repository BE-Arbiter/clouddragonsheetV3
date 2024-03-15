import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

export const FEATURES_ROUTES: Routes = [
  {
    path : '' ,
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  },
  {
    path : 'login' ,
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
  }
]


@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(FEATURES_ROUTES)
  ]
})
export class FeaturesModule { }
