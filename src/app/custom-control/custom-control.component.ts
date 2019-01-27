import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NgControl, ValidationErrors} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-custom-control',
  template: `
    <label [class.app-required]="required">{{label}}</label>
    <input [id]="id" type="number" [value]="value" [disabled]="disabled" (input)="onInput($event)" (blur)="onBlur($event)">
    {{errors | json}}
  `,
/*
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomControlComponent),
      multi: true
    }
  ],
*/
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomControlComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() id: string;
  @Input() label: string;
  @Input() required: boolean;

  disabled = false;
  value: number;
  errors: ValidationErrors | null;

  onChange = (_: any) => {};
  onTouched = () => {};

  statusChangeSubscription: Subscription;

  constructor(
    private cd: ChangeDetectorRef,
    @Optional() @Self() private ngControl: NgControl,
  ) {
    console.log('CustomControlComponent#init', ngControl);

    // Providing ControlValueAccessor to NgControl via NG_VALUE_ACCESSOR provider does work when NgControl should also be injected due to
    // cyclic dependency errors. Therefore remove export of NG_VALUE_ACCESSOR and inject valueAccessor accessor manually into ngControl.
    // @see https://github.com/angular/material2/blob/master/guides/creating-a-custom-form-field-control.md#ngcontrol
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    console.log('CustomControlComponent#onInit', this.ngControl.errors, this.id);
    if (this.ngControl) {
      this.errors = this.ngControl.errors;

      this.statusChangeSubscription = this.ngControl.statusChanges.subscribe(status => {
        console.log('CustomControlComponent statusChanges', status, this.id);
        this.errors = this.ngControl.errors;
        this.cd.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.statusChangeSubscription) {
      this.statusChangeSubscription.unsubscribe();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    console.log('CustomControlComponent#setDisabledState', isDisabled);
    this.disabled = isDisabled;
    this.cd.markForCheck();
  }

  writeValue(value: number): void {
    console.log('CustomControlComponent#writeValue', value);
    this.value = value;
    this.cd.markForCheck();
  }

  onInput(event: InputEvent) {
    this.value = CustomControlComponent.valueToModel((event.target as HTMLInputElement).value);
    console.log('CustomControlComponent#onInput', event.data, '-> onChange(', this.value, ')');
    this.onChange(this.value);
  }

  onBlur(event: FocusEvent) {
    console.log('CustomControlComponent#onBlur', event);
    this.onTouched();
  }

  private static valueToModel(value: string) {
    if (value) {
      return Number.parseInt(value);
    } else {
      return null;
    }
  }
}
