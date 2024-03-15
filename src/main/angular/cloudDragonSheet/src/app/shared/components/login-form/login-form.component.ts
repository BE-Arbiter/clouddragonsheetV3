import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Login, LoginForm} from "../../../core/model/login.model";
import {AuthService} from "../../../core/services/auth.service";
import {UiService} from "../../../core/services/ui.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  public formGroup : FormGroup<LoginForm>
  constructor(
    private authService : AuthService,
    fb : FormBuilder,
    private ui : UiService,
    private router : Router,
    private translate : TranslateService
  ) {
    this.formGroup = fb.group<LoginForm>({
        username: fb.nonNullable.control("",Validators.required),
        password: fb.nonNullable.control<string>("",Validators.required),
      }
    )
  }

  public doLogin(){
    if(!this.formGroup.valid){
      this.formGroup.markAllAsTouched();
      this.ui.warn(this.translate.instant("errors.form.invalid"));
      return;
    }
    const login : Login = this.formGroup.value as Login;
    this.authService.login(login).subscribe(value => {
      this.router.navigate(["/dashboard"]);
    });
  }

}
