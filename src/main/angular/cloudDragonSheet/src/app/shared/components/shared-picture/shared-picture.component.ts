import {Component, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FileUpload} from "primeng/fileupload";
import {UiService} from "../../../core/services/ui.service";

@Component({
  selector: 'app-shared-picture',
  templateUrl: './shared-picture.component.html',
  styleUrl: './shared-picture.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SharedPictureComponent),
      multi: true
    }
  ]
})
export class SharedPictureComponent implements ControlValueAccessor {
  @ViewChild('fileUpload', {static: false}) public fileUpload: FileUpload | any;
  @Input()
  formControl! : FormControl<string>;
  public value!: string;
  public onChange!: any;
  public onTouched!: any;
  public disabled: boolean = false;

  constructor(
    private ui : UiService,
  ) {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: string): void {
    this.value = obj;
  }

  onDrop($event: DragEvent) { }


  public clear():void{
    this.fileUpload.clear();
  }

  public doUpload(event: any){
    let fileList;
    //Si l'event est un drag
    if (event instanceof DragEvent && event.dataTransfer) {
      fileList = event.dataTransfer.files;
    } else {
      fileList = event.files;
    }
    for(let file of fileList){
      if(file instanceof File) {
        let size = file.size;
        let maxSize = 1024 * 1024; // 1Mb
        if(size >= maxSize){
          this.ui.warn("errors.file.tooLarge");
          this.clear();
          return;
        }

        let data: string = '';

        let reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
          data = reader.result as string;
          if(this.formControl){
            this.formControl.patchValue(data);
          }
          else {
            this.writeValue(data);
          }
          this.clear();
        });
        reader.readAsDataURL(file);
        return;
      }
    }
  }
}
