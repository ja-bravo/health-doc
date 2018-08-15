import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Project, Status } from '../models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private project: Project;
  constructor(private httpClient: HttpClient) { }

  public getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>('http://localhost:3000/api/v1/projects');
  }

  public createProject(project): Observable<Project> {
    return this.httpClient.post<Project>('http://localhost:3000/api/v1/projects', project);
  }

  public setProject(project: Project) {
    this.project = project;
  }

  public changeStatus(project: Project, status: Status) {
    project.active = status === Status.ACTIVE;
    return this.httpClient.patch('http://localhost:3000/api/v1/projects', project);
  }

  public deleteProject(project: Project) {
    const params = new HttpParams({fromObject: {id: project._id}});
    return this.httpClient.delete<number>('http://localhost:3000/api/v1/projects', {params});
  }
}
