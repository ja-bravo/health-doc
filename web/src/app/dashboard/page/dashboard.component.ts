import { Result } from './../../../../../shared/result';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Stats } from '../../../../../shared/stats';
import { StatsService } from '../../shared/services/stats.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { OnDestroy } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public moment = moment;
  public stats: Stats;
  public columnsToDisplay = ['project', 'check', 'status', 'extra', 'time'];
  public subscription: Subscription;
  public dataSource = new MatTableDataSource<Result>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private statsService: StatsService) { }

  async ngOnInit() {
    this.subscription = this.statsService.getStatsObv().subscribe(stats => {
       this.dataSource.data = stats.lastResults;
       this.stats = stats;
    });
    this.dataSource.paginator = this.paginator;
  }

  public ngOnDestroy() { this.subscription.unsubscribe(); }
}
