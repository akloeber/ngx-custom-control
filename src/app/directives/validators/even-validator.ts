import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {CustomValidators} from 'src/app/validators';
import {Directive, forwardRef, Input} from '@angular/core';

@Directive({
  selector: `
  input[even][type=number],
  app-custom-control[even][formControl],
  app-custom-control[even][formControlName],
  app-custom-control[even][ngModel]
  `,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => EvenValidator),
    multi: true,
  }],
})
export class EvenValidator implements Validator {

  private onChange = () => {};

  private _even: boolean;

  get even(): boolean {
    return this._even;
  }

  @Input()
  set even(value: boolean) {
    this._even = value;
    this.onChange();
  }


  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('EvenValidator#validate');
    return this.even ? CustomValidators.even(control) : null;
  }
}
