import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnregisteredLayoutComponent} from './unregistered-layout/unregistered-layout.component';
import {RegisteredLayoutComponent} from './registered-layout/registered-layout.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {SharedModule} from "../shared/shared.module";
import {LeftMenuComponent} from './left-menu/left-menu.component';
import {TopMenuComponent} from './top-menu/top-menu.component';


@NgModule({
  declarations: [
    UnregisteredLayoutComponent,
    RegisteredLayoutComponent,
    TopBarComponent,
    LeftMenuComponent,
    TopMenuComponent
  ],
  exports: [
    UnregisteredLayoutComponent,
    RegisteredLayoutComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        SharedModule,
    ]
})
export class LayoutModule {
}
