import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnregisteredLayoutComponent} from './unregistered-layout/unregistered-layout.component';
import {RegisteredLayoutComponent} from './registered-layout/registered-layout.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {RouterOutlet} from "@angular/router";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    UnregisteredLayoutComponent,
    RegisteredLayoutComponent,
    TopBarComponent
  ],
  exports: [
    UnregisteredLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterOutlet,
    SharedModule,
  ]
})
export class LayoutModule {
}
