import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[FullNameValidator]',
  providers:[{provide:NG_VALIDATORS,useExisting:FullNameValidatorDirective,multi:true}]
})
export class FullNameValidatorDirective implements Validators{

  constructor() { }
  validate(control: FormControl): ValidationErrors | null {
    const fullNameRegex = /^[a-zA-Z ]*$/
    const valid = fullNameRegex.test(control.value)
    return valid ? null : {invalidFullName:true}
  }
}
