import { Directive } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[PasswordValidator]',
  providers:[{provide:NG_VALIDATORS,useExisting:PasswordValidatorDirective,multi:true}]
})
export class PasswordValidatorDirective implements Validator {
  constructor() { }
  validate(control: FormControl): ValidationErrors | null {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    const valid = passwordRegex.test(control.value)
    return valid ? null : {invalidPassword:true}
  }
  
}
