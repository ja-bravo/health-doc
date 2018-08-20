import { Component, OnInit } from '@angular/core';
import { Stats } from '../../../../../shared/stats';
import { StatsService } from '../../shared/services/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stats: Stats;
  constructor(private statsService: StatsService) { }

  async ngOnInit() {
    this.stats = await this.statsService.getStats();
  }

}
