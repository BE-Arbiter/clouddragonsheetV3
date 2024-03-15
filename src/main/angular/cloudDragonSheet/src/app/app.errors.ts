import {ErrorHandler, Injectable, Injector} from "@angular/core";
import {UiService} from "./core/services/ui.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";

const UNKNOWN_ERROR = 'Unknown Error';
const NO_MESSAGE = "No Message"

export class ApplicationError {
  public code: number;
  public status: string;
  public message: string;

  constructor(public sourceError: any) {
    if (sourceError instanceof HttpErrorResponse) {
      let httpError: HttpErrorResponse = sourceError as HttpErrorResponse;
      this.code = httpError.status;
      this.status = httpError.statusText;
      this.message = httpError.message;
    } else if (sourceError instanceof Error) {
      let error: Error = sourceError as Error;
      this.code = -1;
      this.status = error.name;
      this.message = error.message;
    } else {
      this.code = sourceError.code ? sourceError.code : -1;
      this.status = sourceError.status ? sourceError.status : UNKNOWN_ERROR;
      this.message = sourceError.message ? sourceError.message : NO_MESSAGE;
    }
  }
}

@Injectable()
export class AppErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {
  }

  handleError(error: any): void {
    if ((error.message || '').includes('ExpressionChangedAfterItHasBeenCheckedError')) {
      console.error(error.message, error);
      return;
    }
    const ui = this.injector.get(UiService)
    const translate = this.injector.get(TranslateService)
    let applicationError: ApplicationError | null;
    if (error instanceof ApplicationError) {
      applicationError = error as ApplicationError
    } else {
      applicationError = new ApplicationError(error);
      if(applicationError.code == -1
        && applicationError.status === UNKNOWN_ERROR
        && applicationError.message === NO_MESSAGE){
        console.error('An Unknown Error occurred, See log below',error)
        console.log(error);
        return;
      }
    }
    console.error(applicationError);
    //Avertir l'utilisateur
    if(applicationError.code === 401){
      ui.warn(translate.instant('errors.unauthorized'));
      ui.endProgess();
      return;
    }
    if(applicationError.message.includes("warning")){
      ui.warn(translate.instant(applicationError.message));
    }
    else{
      ui.error(translate.instant(applicationError.message));
    }
    ui.endProgess();
    return;


  }

}
