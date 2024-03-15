import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

export const FEATURES_ROUTES: Routes = [

]


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FEATURES_ROUTES)
  ]
})
export class FeaturesModule { }
