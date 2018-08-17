import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Check, Status } from '../models/check';
import { Project } from '../models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecksService {
  constructor(private httpClient: HttpClient) { }

  public getChecks(): Promise<Check[]> {
    return this.httpClient.get<Check[]>('http://localhost:3000/api/v1/checks').toPromise();
  }

  public getChecksByProject(project: Project): Promise<Check[]> {
    const params = new HttpParams({ fromObject: { id: project._id } });
    return this.httpClient.get<Check[]>('http://localhost:3000/api/v1/checks/project', { params }).toPromise();
  }

  public getChecksByProjectObv(project: Project): Observable<Check[]> {
    const params = new HttpParams({ fromObject: { id: project._id } });
    return this.httpClient.get<Check[]>('http://localhost:3000/api/v1/checks/project', { params });
  }

  public createCheck(check: Check): Promise<Check> {
    return this.httpClient.post<Check>('http://localhost:3000/api/v1/checks', check).toPromise();
  }

  public changeStatus(check: Check, status: Status) {
    check.active = status === Status.ACTIVE;
    return this.httpClient.patch<number>('http://localhost:3000/api/v1/checks', check).toPromise();
  }

  public deleteCheck(check: Check) {
    const params = new HttpParams({ fromObject: { id: check._id } });
    return this.httpClient.delete<number>('http://localhost:3000/api/v1/checks', { params }).toPromise();
  }
}
