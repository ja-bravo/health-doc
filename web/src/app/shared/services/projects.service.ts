import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Project, Status } from '../../../../../shared/project';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  public project: Project = { name: 'Test project', checks: 0, _id: 'yQ2qSJ65ZXZuFCl9', email: 'jose@boonagency.ie',
  active: true, createdAt: moment().format()};
  constructor(private httpClient: HttpClient) { }

  public getProjects(): Promise<Project[]> {
    return this.httpClient.get<Project[]>(`${environment.api}/projects`).toPromise();
  }

  public getProjectsObservable(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${environment.api}/projects`);
  }

  public createProject(project): Promise<Project> {
    console.dir(project);
    return this.httpClient.post<Project>(`${environment.api}/projects`, project).toPromise();
  }

  public setProject(project: Project) {
    this.project = project;
  }

  public changeStatus(project: Project, status: Status) {
    project.active = status === Status.ACTIVE;
    return this.httpClient.patch(`${environment.api}/projects`, project).toPromise();
  }

  public deleteProject(project: Project) {
    const params = new HttpParams({fromObject: {id: project._id}});
    return this.httpClient.delete<number>(`${environment.api}/projects`, {params}).toPromise();
  }
}
