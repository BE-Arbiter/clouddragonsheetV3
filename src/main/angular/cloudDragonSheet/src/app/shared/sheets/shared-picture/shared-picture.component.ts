import {Component, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FileUpload} from "primeng/fileupload";

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
        let filename = file.name;
        let mimeType = file.type;
        let data: string = '';

        let reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
          data = reader.result as string;
          this.writeValue(data);
          this.clear();
        });
        reader.readAsDataURL(file);
        return;
      }
    }
  }
}
