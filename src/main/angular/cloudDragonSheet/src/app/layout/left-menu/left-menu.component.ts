import {Component, OnInit} from '@angular/core';
import {UserFull} from "../../core/model/user.model";
import {MenuItem} from "primeng/api";
import {AuthService} from "../../core/services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {RolesEnum} from "../../core/enums/roles.enum";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
@UntilDestroy()
export class LeftMenuComponent implements OnInit{
  public currentUser: UserFull | null = null;
  public menu : MenuItem[] = []

  constructor(
    private authService: AuthService,
    private translate : TranslateService,
    private router : Router,
  ) {
  }
  ngOnInit(): void {
    this.authService.currentUser$.pipe(untilDestroyed(this))
      .subscribe(value => {
        this.currentUser = value;
        this.menu = [];
        if(value?.roles?.includes(RolesEnum.ROLE_USER)){
          this.menu.push({
            routerLink : ["/user","sheets","list"],
            label : this.translate.instant("menu.user.sheets"),
            iconClass : "pi pi-file text-2xl"
          })
        }
        if(value?.roles?.includes(RolesEnum.ROLE_ADMIN)){
          this.menu.push({
            routerLink : ["/admin","users","list"],
            label : this.translate.instant("menu.admin.users"),
            iconClass : "pi pi-users text-2xl"
          })

        }
      });
  }

}
