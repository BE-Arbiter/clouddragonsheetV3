import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "./core/services/auth.service";
import {UiService} from "./core/services/ui.service";
import {UserFull} from "./core/model/user.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-cloud-dragon-sheet',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  public user : UserFull | null = null;
  constructor(
    public translate: TranslateService,
    public authService: AuthService,
    public uiService: UiService,
  ) {
    translate.addLangs(['fr', 'en']);
    translate.setDefaultLang('fr');
    translate.use('fr');
  }

  ngOnInit(): void {
    this.authService.currentUser$.pipe(untilDestroyed(this)).subscribe(value => this.user = value);
    this.authService.updateUserInfo().subscribe();
  }

  public get authenticated(){
    return this.user && this.user.username !== "guest";
  }

}
