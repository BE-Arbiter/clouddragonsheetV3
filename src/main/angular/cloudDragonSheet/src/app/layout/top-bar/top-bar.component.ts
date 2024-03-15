import {Component, OnInit} from '@angular/core';
import {UserFull} from "../../core/model/user.model";
import {AuthService} from "../../core/services/auth.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Router} from "@angular/router";

@UntilDestroy()
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {
  public currentUser: UserFull | null = null;

  constructor(
    private authService: AuthService,
    private router : Router,
  ) {
  }
  ngOnInit(): void {
    this.authService.currentUser$.pipe(untilDestroyed(this))
      .subscribe(value => this.currentUser = value);
  }

  logout():void{
    this.authService.logout().subscribe(value => {
      this.router.navigate(["/"])
    });
  }


  public get isAuthenticated(){
    return this.currentUser && this.currentUser.username !== 'guest';
  }
}
