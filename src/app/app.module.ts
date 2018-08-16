import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DynamicTableModule } from 'projects/angular-dynamic-table/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamicTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
