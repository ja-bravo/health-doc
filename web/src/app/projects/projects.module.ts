import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent, DialogComponent } from './page/projects.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [ProjectsComponent, DialogComponent, DetailComponent],
  entryComponents: [DialogComponent]
})
export class ProjectsModule { }
