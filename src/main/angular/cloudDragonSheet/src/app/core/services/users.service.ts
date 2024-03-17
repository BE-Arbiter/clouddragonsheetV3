import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, take} from "rxjs";
import {User, UserAdmin} from "../model/user.model";
import {SimpleAnswer} from "../model/simple-answer.model";


@Injectable({
  providedIn:'root'
})
export class UsersService{
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
  public username(id : number):Observable<string>{
    return this.http.get<User>(`${this.basepath}/${id}/username`)
      .pipe(
        take(1),
        map(value => {
          if(value){
            return value.username || "Not found";
          }
          return "Not found";
        })
      );
  }
  public delete(user : UserAdmin):Observable<SimpleAnswer>{
    return this.http.delete<SimpleAnswer>(`${this.basepath}/${user.id}`)
      .pipe(
        take(1),
      );
  }
  public update(user : UserAdmin):Observable<UserAdmin>{
    return this.http.put<UserAdmin>(`${this.basepath}`,user)
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
