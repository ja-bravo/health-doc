import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Check, Status } from '../../../../../shared/check';
import { Project } from '../../../../../shared/project';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChecksService {
  constructor(private httpClient: HttpClient) { }

  public getChecks(): Promise<Check[]> {
    return this.httpClient.get<Check[]>(`${environment.api}/checks`).toPromise();
  }

  public getChecksByProject(project: Project): Promise<Check[]> {
    const params = new HttpParams({ fromObject: { id: project._id } });
    return this.httpClient.get<Check[]>(`${environment.api}/checks/project`, { params }).toPromise();
  }

  public getChecksByProjectObv(project: Project): Observable<Check[]> {
    const params = new HttpParams({ fromObject: { id: project._id } });
    return this.httpClient.get<Check[]>(`${environment.api}/checks/project`, { params });
  }

  public createCheck(check: Check): Promise<Check> {
    return this.httpClient.post<Check>(`${environment.api}/checks`, check).toPromise();
  }

  public changeStatus(check: Check, status: Status) {
    check.active = status === Status.ACTIVE;
    return this.httpClient.patch<number>(`${environment.api}/checks`, check).toPromise();
  }

  public deleteCheck(check: Check) {
    const params = new HttpParams({ fromObject: { id: check._id } });
    return this.httpClient.delete<number>(`${environment.api}/checks`, { params }).toPromise();
  }
}
