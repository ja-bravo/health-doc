import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './page/dashboard.component';
import { MaterialModule } from '../material.module';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [DashboardComponent, DashboardCardComponent]
})
export class DashboardModule { }
