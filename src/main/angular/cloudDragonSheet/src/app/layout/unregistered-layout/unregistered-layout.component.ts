import { Component } from '@angular/core';

@Component({
  selector: 'app-unregistered-layout',
  templateUrl: './unregistered-layout.component.html',
  styleUrl: './unregistered-layout.component.scss'
})
export class UnregisteredLayoutComponent {

  public get showTopbar(){
    const url = window.location.toString();
    return !url.includes("auth/login") && !url.includes("auth/subscribe") && !url.includes("auth/activate");
  }
}
