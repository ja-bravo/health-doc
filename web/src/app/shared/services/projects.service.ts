import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Project, Status } from '../models/project';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  public project: Project = { name: 'Test project', checks: 0, _id: 'yQ2qSJ65ZXZuFCl9', email: 'jose@boonagency.ie',
  active: true, createdAt: moment()};
  constructor(private httpClient: HttpClient) { }

  public getProjects(): Promise<Project[]> {
    return this.httpClient.get<Project[]>('http://localhost:3000/api/v1/projects').toPromise();
  }

  public getProjectsObservable(): Observable<Project[]> {
    return this.httpClient.get<Project[]>('http://localhost:3000/api/v1/projects');
  }

  public createProject(project): Promise<Project> {
    console.dir(project);
    return this.httpClient.post<Project>('http://localhost:3000/api/v1/projects', project).toPromise();
  }

  public setProject(project: Project) {
    this.project = project;
  }

  public changeStatus(project: Project, status: Status) {
    project.active = status === Status.ACTIVE;
    return this.httpClient.patch('http://localhost:3000/api/v1/projects', project).toPromise();
  }

  public deleteProject(project: Project) {
    const params = new HttpParams({fromObject: {id: project._id}});
    return this.httpClient.delete<number>('http://localhost:3000/api/v1/projects', {params}).toPromise();
  }
}
