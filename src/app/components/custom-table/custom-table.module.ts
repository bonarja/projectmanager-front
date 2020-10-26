import { NgModule } from '@angular/core';
import { CustomTableComponent } from './custom-table.component';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CustomTableComponent],
  imports: [CommonModule, FormsModule, AgGridModule.withComponents([])],
  exports: [CustomTableComponent],
})
export class CustomTableModule {}
