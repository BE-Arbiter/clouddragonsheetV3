import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "./core/services/auth.service";
import {UiService} from "./core/services/ui.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

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
    this.authService.updateUserInfo().subscribe();
  }


}
