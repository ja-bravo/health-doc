import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent, DialogComponent } from './page/projects.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DetailComponent, NewCheckDialogComponent } from './detail/detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [ProjectsComponent, DialogComponent, DetailComponent, NewCheckDialogComponent],
  entryComponents: [DialogComponent, NewCheckDialogComponent]
})
export class ProjectsModule { }
