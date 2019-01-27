import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'src/app/validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  age = 37;
  disabled = false;
  required = true;
  validateEven = true;

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      age: new FormControl(this.age, [Validators.required, CustomValidators.even]),
      ageDynamic: new FormControl(this.age)
    });
  }

  onDisabledChange(disabled: boolean) {
    console.log('AppComponent#onDisabledChange', disabled);
    if (disabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
