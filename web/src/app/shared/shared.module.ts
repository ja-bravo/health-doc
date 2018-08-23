import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { DetailCardComponent } from './detail-card/detail-card.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    DetailCardComponent
  ],
  declarations: [DetailCardComponent]
})
export class SharedModule { }
