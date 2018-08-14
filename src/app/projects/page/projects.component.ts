import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from '../../shared/services/projects.service';
import { Project } from '../../shared/models/project';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public columnsToDisplay = ['status', 'name', 'checks', 'createdAt', 'controls'];
  public projects: Project[] = [];
  public dataSource: MatTableDataSource<Project>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public moment = moment;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projects = this.projectsService.getProjects();
    this.dataSource = new MatTableDataSource<Project>(this.projects);
    this.dataSource.paginator = this.paginator;
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onProjectClick(project: Project) {
    console.dir(project);
  }

  public pauseProject(id: number) {

  }

  public resumeProject(id: number) {

  }

  public deleteProject(id: number) {
    if (confirm('Are you sure? This will permanently delete this project')) {

    }
  }
}
