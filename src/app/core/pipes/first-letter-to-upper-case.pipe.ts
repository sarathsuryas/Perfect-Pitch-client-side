import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterToUpperCase'
})
export class FirstLetterToUpperCasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
