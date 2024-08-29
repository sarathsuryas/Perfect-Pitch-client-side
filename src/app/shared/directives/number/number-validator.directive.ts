import { Directive } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[NumberValidator]',
  providers:[{provide:NG_VALIDATORS,useExisting:NumberValidatorDirective,multi:true}]
})
export class NumberValidatorDirective implements Validator{

  constructor() { }
  validate(control: FormControl): ValidationErrors | null {
    const numberRegex = /^[0-9]+$/
    const valid = numberRegex.test(control.value)
    return valid ? null : {invalidNumber:true}
  }
  

}
