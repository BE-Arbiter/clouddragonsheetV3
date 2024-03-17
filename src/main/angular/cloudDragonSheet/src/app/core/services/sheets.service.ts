import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {UserAdmin} from "../model/user.model";
import {SimpleAnswer} from "../model/simple-answer.model";
import {Sheet} from "../model/sheet.model";


@Injectable({
  providedIn:'root'
})
export class SheetsService{
  private basepath : string = '/api/sheets'

  constructor(
    private http: HttpClient,
  ) {
  }
  public list():Observable<Sheet[]>{
    return this.http.get<Sheet[]>(`${this.basepath}/all`)
      .pipe(
        take(1),
      );
  }
  public delete(sheet:Sheet):Observable<SimpleAnswer>{
    return this.http.delete<SimpleAnswer>(`${this.basepath}/${sheet.id}`)
      .pipe(
        take(1),
      );
  }
  public update(sheet : Sheet):Observable<Sheet>{
    return this.http.put<Sheet>(`${this.basepath}`,sheet)
      .pipe(
        take(1),
      );
  }
  public create(sheet : Sheet):Observable<Sheet>{
    return this.http.post<Sheet>(`${this.basepath}`,sheet)
      .pipe(
        take(1),
      );
  }
}
