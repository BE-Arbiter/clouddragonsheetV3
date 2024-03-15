import {Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Login, LoginForm} from "../../../core/model/login.model";
import {UiService} from "../../../core/services/ui.service";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
      this.router.navigate(["/"]);
    });
  }
}
