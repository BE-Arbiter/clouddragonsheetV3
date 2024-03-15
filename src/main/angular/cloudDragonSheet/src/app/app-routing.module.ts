import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ErrorPageComponent} from "./shared/components/error-page/error-page.component";

const routes: Routes = [
  { path: 'access-denied', component:ErrorPageComponent,data:{errorCode:403} },
  { path: '**', component:ErrorPageComponent,data:{errorCode:404} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true,
    onSameUrlNavigation:'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
