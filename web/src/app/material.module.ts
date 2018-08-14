import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatSidenavModule, MatToolbarModule, MatGridListModule,
  MatCardModule, MatDividerModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
  ],
  declarations: []
})
export class MaterialModule { }
