import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../core/services/users.service";
import {UserAdmin, UserAdminForm, UserFull} from "../../../core/model/user.model";
import {Column} from "../../../core/model/column.model";
import {TranslateService} from "@ngx-translate/core";
import {take} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UiService} from "../../../core/services/ui.service";
import {ConfirmationService} from "primeng/api";
import {AuthService} from "../../../core/services/auth.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";


@UntilDestroy()
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  public currentUser:UserFull | null = null;
  /* List */
  public users: UserAdmin[] = [];
  public cols!: Column[];

  /* Edition */
  public showModal : boolean = false;
  public formGroup!: FormGroup<UserAdminForm>;

  public constructor(
    private userService: UsersService,
    private authService: AuthService,
    fb : FormBuilder,
    private translateService: TranslateService,
    private ui : UiService,
    private confirmationService : ConfirmationService,
  ) {
    this.authService.currentUser$.pipe()
    this.formGroup = fb.group<UserAdminForm>({
      id : fb.control(null),
      username:fb.nonNullable.control("",Validators.required),
      email:fb.nonNullable.control("",Validators.required),
      firstName:fb.nonNullable.control("",Validators.required),
      lastName:fb.nonNullable.control("",Validators.required),
      activated:fb.nonNullable.control(true,Validators.required),
      password:fb.nonNullable.control(""),
      roles:fb.nonNullable.control([],Validators.required)
    })
  }

  ngOnInit(): void {
    this.authService.currentUser$.pipe(untilDestroyed(this)).subscribe(value => this.currentUser = value)
    this.userService.list().pipe(take(1)).subscribe(value => {
        this.users = value;
      }
    )
    this.cols = [
      {
        field: 'id',
        header: this.translateService.instant("user.id"),
        type: "text",
      },
      {
        field: 'username',
        header: this.translateService.instant("user.username"),
        type: "text",
      },
      {
        field: 'email',
        header: this.translateService.instant("user.email"),
        type: "text",
      },
      {
        field: 'firstName',
        header: this.translateService.instant("user.firstName"),
        type: "text",
      },
      {
        field: 'lastName',
        header: this.translateService.instant("user.lastName"),
        type: "text",
      },
      {
        field: 'roles',
        header: this.translateService.instant("user.roles"),
        type: "RolesEnum",
      },
    ];
  }

  public editUser(user : UserAdmin){
    this.formGroup.reset();
    this.formGroup.patchValue(user);
    this.showModal = true;
  }

  public newUser(){
    this.formGroup.reset();
    this.showModal = true;
  }
  public saveUser(){
    if(!this.formGroup.valid){
      this.ui.warn(this.translateService.instant("errors.form.invalid"));
      this.formGroup.markAllAsTouched();
      return;
    }
    this.ui.startProgress();
    let user =  {...this.formGroup.value} as UserAdmin;
    if(user.id) {
      this.userService.update(user).subscribe(value => {
        let newUserArray = this.users.filter(value1 => value1.id !== value.id);
        newUserArray.push(value);
        this.users = newUserArray;
        this.showModal = false;
        this.formGroup.reset();
        this.ui.success(this.translateService.instant("common.saved"))
        this.ui.endProgess();
      });
    }
    else{
      this.userService.create(user).subscribe(value => {
        this.users.push(value);
        this.showModal = false;
        this.formGroup.reset();
        this.ui.success(this.translateService.instant("common.created"))
        this.ui.endProgess();
      });
    }
  }

  public closeModal(){
    this.formGroup.reset();
    this.showModal = false;
  }

  public deleteUser(user:UserAdmin){
    if(user.id == this.currentUser?.id){
      this.ui.warn(this.translateService.instant("user.cantDeleteSelf"));
      return;
    }
      this.confirmationService.confirm({
        message: this.translateService.instant("user.confirmDelete"),
        header: this.translateService.instant("toast.warn"),
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
          this.ui.startProgress();
          this.userService.delete(user).subscribe(()=> {
            this.users = this.users.filter(value => value.id != user.id);
            this.ui.success(this.translateService.instant("common.deleted"));
            this.ui.endProgess();
          })
        }
      });
  }

}
