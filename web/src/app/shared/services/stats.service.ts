import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stats } from '../../../../../shared/stats';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  constructor(private httpClient: HttpClient) { }

  public getStats(): Promise<Stats> {
    return this.httpClient.get<Stats>(`${environment.api}/stats`).toPromise();
  }
}
