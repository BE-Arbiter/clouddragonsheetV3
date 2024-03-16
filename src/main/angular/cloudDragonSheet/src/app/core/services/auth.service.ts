import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, take, tap} from "rxjs";
import {Login} from "../model/login.model";
import {UserFull} from "../model/user.model";
import {Subscribe} from "../model/subscribe.model";
import {SimpleAnswer} from "../model/simple-answer.model";


@Injectable({
  providedIn:'root'
})
export class AuthService{
  private basepath : string = '/api/auth'

  private currentUser : BehaviorSubject<UserFull|null> = new BehaviorSubject<UserFull|null>(null);
  public currentUser$ : Observable<UserFull|null> = this.currentUser.asObservable();

  constructor(
    private http: HttpClient,
  ) {
  }
  public updateUserInfo():Observable<UserFull>{
    return this.http.get<UserFull>(`${this.basepath}/me`)
      .pipe(
        take(1),
        tap(value =>{
          this.currentUser.next(value);
        })
      );
  }
  public login(login : Login){
    return this.http.post<UserFull>(`${this.basepath}/login`,login)
      .pipe(
        take(1),
        tap(value =>{
          this.currentUser.next(value)
        })
      );
  }
  public subscribe(subscribe : Subscribe){
    return this.http.post<SimpleAnswer>(`${this.basepath}/subscribe`,subscribe)
      .pipe(
        take(1)
      );
  }
  public logout(){
    return this.http.post<UserFull>(`${this.basepath}/logout`,{})
      .pipe(
        take(1),
        tap(value =>{
          this.currentUser.next(value)
        })
      );
  }

}
