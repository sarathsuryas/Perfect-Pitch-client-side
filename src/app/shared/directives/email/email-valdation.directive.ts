import { Directive } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[EmailValidation]',
  providers:[{provide:NG_VALIDATORS,useExisting:EmailValidationDirective,multi:true}]
})
export class EmailValidationDirective implements Validator {

  constructor() { }
  validate(control: FormControl): ValidationErrors | null {
    const emailRegex =  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    const valid =emailRegex.test(control.value)
    return valid ? null : {invalidEmail:true}
  }
  
}
