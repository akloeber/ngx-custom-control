import {AbstractControl, ValidationErrors} from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
  return value == null || value.length === 0;
}

export class CustomValidators {

  static even(control: AbstractControl): ValidationErrors | null {
    console.log('CustomValidators#even');

    if (isEmptyInputValue(control.value)) {
      return null;
    }
    const valid = (control.value % 2 === 0);
    if (valid) {
      return null;
    } else {
      return {
        odd: {actualValue: control.value}
      }
    }
  }
}

