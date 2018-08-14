import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './page/projects.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    HttpClientModule,
    MaterialModule,
  ],
  declarations: [ProjectsComponent]
})
export class ProjectsModule { }
