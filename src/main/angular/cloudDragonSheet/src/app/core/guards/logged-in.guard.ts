import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {map, take} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.authService.currentUser$.pipe(
      take(1),
      map(value => {
        console.log(value);
        if (value != null && value.username !== "guest") {
          return true;
        }
        return this.router.parseUrl("/access-denied");
      })
    );
  }
}
