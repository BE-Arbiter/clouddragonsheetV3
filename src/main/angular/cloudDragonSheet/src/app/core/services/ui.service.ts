import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {MessageService} from "primeng/api";


@Injectable({
  providedIn:'root'
})
export class UiService{
  private _blocked = false;
  private _loading = false;

  constructor(
    private translate : TranslateService,
    private messageService : MessageService,
  ) {
  }

  public info(message:string,title:string|null = null){
    let _title = title || this.translate.instant('toast.info');
    this.notify('info',message,_title);
  }
  public warn(message:string,title:string|null = null){
    let _title = title || this.translate.instant('toast.warn');
    this.notify('warn',message,_title);
  }
  public error(message:string,title:string|null = null){
    let _title = title || this.translate.instant('toast.error');
    this.notify('error',message,_title);
  }
  public success(message:string,title:string|null = null){
    let _title = title || this.translate.instant('toast.success');
    this.notify('success',message,_title);
  }

  public notify(type:string,message:string,title:string){
    this.messageService.add({severity:type,summary:title,detail:message});
  }

  public startProgress(blockUI:boolean = true){
    this._blocked = blockUI;
    this._loading = true;
  }

  public endProgess(){
    this._blocked = false;
    this._loading = false;
  }

  public get blocked(){
    return this._blocked;
  }

  public get loading(){
    return this._loading;
  }
}
