import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomControlComponent } from './custom-control/custom-control.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EvenValidator} from 'src/app/directives/validators/even-validator';

@NgModule({
  declarations: [
    AppComponent,
    CustomControlComponent,
    EvenValidator,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
