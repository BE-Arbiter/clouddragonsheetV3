import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnregisteredLayoutComponent} from './unregistered-layout/unregistered-layout.component';
import {RegisteredLayoutComponent} from './registered-layout/registered-layout.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {SharedModule} from "../shared/shared.module";
import {RouterLink} from "@angular/router";


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
        SharedModule,
    ]
})
export class LayoutModule {
}
