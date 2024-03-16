import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {UserAdminForm} from "../../../core/model/user.model";
import {TranslateService} from "@ngx-translate/core";
import {RolesEnum} from "../../../core/enums/roles.enum";

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrl: './user-edit-form.component.scss'
})
export class UserEditFormComponent implements OnInit {
  @Input()
  public userForm!: FormGroup<UserAdminForm>

  public roles!: any[];

  public constructor(
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.roles = [
      {label: this.translate.instant("roles.ROLE_USER"), value: RolesEnum.ROLE_USER},
      {label: this.translate.instant("roles.ROLE_ADMIN"), value: RolesEnum.ROLE_ADMIN},
    ];
  }

}
