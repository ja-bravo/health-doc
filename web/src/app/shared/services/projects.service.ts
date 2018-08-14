import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Project } from '../models/project';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) { }

  public getProjects(): Project[] {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(p => ({
      id: p,
      name: `Project ${p}`,
      createdAt: moment(),
      active: Math.random() > 0.5,
      checks: Number.parseInt((Math.random() * 100).toFixed(0))
    }));
  }
}
