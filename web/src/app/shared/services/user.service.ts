import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stats } from '../../../../../shared/stats';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  public register(user, password): Promise<string> {
    return this.httpClient.post<string>(`${environment.api}/user/register`, {user, password}).toPromise();
  }

  public signIn(user, password): Promise<{token?, error?}> {
    return this.httpClient.post<{token?, error?}>(`${environment.api}/user`, {user, password}).toPromise();
  }
}
