import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FeaturesModule} from "./features/features.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader,TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AppErrorHandler} from "./app.errors";
import {ConfirmationService, MessageService} from "primeng/api";

const MODULES : any[] = [
  BrowserModule,
  HttpClientModule,
  TranslateModule.forRoot({
    loader:{
      provide: TranslateLoader,
      useFactory: HTTPLoaderFactory,
      deps: [HttpClient]
    }
  }),
  BrowserAnimationsModule,
  SharedModule,
  FeaturesModule,
  LayoutModule,
  AppRoutingModule
]

export function HTTPLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [...MODULES],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandler},
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
