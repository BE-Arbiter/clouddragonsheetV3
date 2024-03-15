import {Component, OnInit} from '@angular/core';
import {UserFull} from "../../core/model/user.model";
import {AuthService} from "../../core/services/auth.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {
  public currentUser: UserFull | null = null;

  constructor(
    private authService: AuthService
  ) {
  }
  ngOnInit(): void {
    this.authService.currentUser$.pipe(untilDestroyed(this))
      .subscribe(value => this.currentUser = value);
  }

  logout():void{
    this.authService.logout().subscribe();
  }


  public get isAuthenticated(){
    return this.currentUser && this.currentUser.username !== 'guest';
  }
}
