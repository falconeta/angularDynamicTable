import { NgModule } from '@angular/core';
import { DynamicTableComponent } from './dynamic-table.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule
  ],
  declarations: [DynamicTableComponent],
  exports: [DynamicTableComponent]
})
export class DynamicTableModule { }
