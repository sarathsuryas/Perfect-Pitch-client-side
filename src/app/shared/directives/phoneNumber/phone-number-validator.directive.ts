import { Directive } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[PhoneNumberValidator]',
  providers:[{provide:NG_VALIDATORS,useExisting:PhoneNumberValidatorDirective,multi:true}]
})
export class PhoneNumberValidatorDirective implements Validator{

  constructor() { }
  validate(control: FormControl): ValidationErrors | null {
    const phoneRegex = /^[0-9]+$/
    const valid = phoneRegex.test(control.value)
    return valid ? null : {invalidPhone:true}
  }
  

}
