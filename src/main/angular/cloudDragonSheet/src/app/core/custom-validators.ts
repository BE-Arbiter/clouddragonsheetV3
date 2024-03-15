import {AbstractControl, FormGroup, ValidationErrors} from "@angular/forms";

export class CustomValidators{
  static passwordMatch(abstractControl: AbstractControl): ValidationErrors | null{
    if(!(abstractControl instanceof FormGroup)){
      return null;
    }
    const group = abstractControl as FormGroup;
    if(!group.controls['password'] || !group.controls['passwordConfirmation']){
      return null;
    }
    const passwordCtrl = group.controls['password'];
    const confirmCtrl = group.controls['passwordConfirmation'];

    if(!confirmCtrl.value){
      return null;
    }
    if(confirmCtrl.value != passwordCtrl.value){
      let errors = confirmCtrl.errors;
      if(errors == null){
        errors = {}
      }
      errors['passwordMatch'] = true;
      confirmCtrl.setErrors(errors);
    }

    return null;
  }
}
