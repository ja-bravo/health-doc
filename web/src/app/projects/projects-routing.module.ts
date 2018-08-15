import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './page/projects.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path: 'details' , component: DetailComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
