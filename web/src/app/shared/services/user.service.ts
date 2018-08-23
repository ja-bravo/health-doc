import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

  public isFirstTime(): Promise<boolean> {
    return this.httpClient.get<boolean>(`${environment.api}/user`).toPromise();
  }

  public register(user, password): Promise<string> {
    return this.httpClient.post<string>(`${environment.api}/user/register`, {user, password}).toPromise();
  }

  public signIn(user, password): Promise<{token?, error?}> {
    return this.httpClient.post<{token?, error?}>(`${environment.api}/user`, {user, password}).toPromise();
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
