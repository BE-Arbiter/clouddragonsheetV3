import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {UiService} from "../../../core/services/ui.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Subscribe, SubscribeForm} from "../../../core/model/subscribe.model";
import {CustomValidators} from "../../../core/custom-validators";

@Component({
  selector: 'app-subscribe-form',
  templateUrl: './subscribe-form.component.html',
  styleUrl: './subscribe-form.component.scss'
})
export class SubscribeFormComponent {
  public formGroup: FormGroup<SubscribeForm>

  constructor(
    private authService: AuthService,
    fb: FormBuilder,
    private ui: UiService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.formGroup = fb.group<SubscribeForm>({
        username: fb.nonNullable.control("", Validators.required),
        email: fb.nonNullable.control("", [Validators.required,Validators.email]),
        firstName: fb.nonNullable.control("", Validators.required),
        lastName: fb.nonNullable.control("", Validators.required),
        password: fb.nonNullable.control<string>("", Validators.required),
        passwordConfirmation: fb.nonNullable.control<string>("", Validators.required),
      },{validators:[CustomValidators.passwordMatch]}
    )
  }

  public doLogin() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      this.ui.warn(this.translate.instant("errors.form.invalid"));
      return;
    }
    const subscribeDTO: Subscribe = this.formGroup.value as Subscribe;
    this.authService.subscribe(subscribeDTO).subscribe(value => {
      this.router.navigate(["/dashboard"]);
    });

  }
}
