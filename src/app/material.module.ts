import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatSidenavModule, MatToolbarModule, MatGridListModule, MatCardModule, MatDividerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
  ],
  declarations: []
})
export class MaterialModule { }
