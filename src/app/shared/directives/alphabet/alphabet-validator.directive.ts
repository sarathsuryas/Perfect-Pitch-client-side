import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[AlphabetValidator]',
  providers:[{provide:NG_VALIDATORS,useExisting:AlphabetValidatorDirective,multi:true}]
})
export class AlphabetValidatorDirective implements Validators{

  constructor() { }
  validate(control: FormControl): ValidationErrors | null {
    const alphabetRegex = /^[a-zA-Z ]*$/
    const valid = alphabetRegex.test(control.value)
    return valid ? null : {invalidAlphabet:true}
  } 
}
