import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, take, tap} from "rxjs";
import {Login} from "../model/login.model";
import {UserAdmin, UserFull} from "../model/user.model";
import {Subscribe} from "../model/subscribe.model";


@Injectable({
  providedIn:'root'
})
export class AuthService{
  private basepath : string = '/api/users'

  constructor(
    private http: HttpClient,
  ) {
  }
  public list():Observable<UserAdmin[]>{
    return this.http.get<UserAdmin[]>(`${this.basepath}/all`)
      .pipe(
        take(1),
      );
  }
  public delete(user : UserAdmin):Observable<void>{
    return this.http.delete<void>(`${this.basepath}/${user.id}`)
      .pipe(
        take(1),
      );
  }
  public update(user : UserAdmin):Observable<UserAdmin>{
    return this.http.post<UserAdmin>(`${this.basepath}/${user.id}`,user)
      .pipe(
        take(1),
      );
  }
  public create(user : UserAdmin):Observable<UserAdmin>{
    return this.http.post<UserAdmin>(`${this.basepath}`,user)
      .pipe(
        take(1),
      );
  }
}
