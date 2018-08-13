import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @Input() title;
  @Input() subtitle;
  @Input() icon;
  @Input() color;

  public raised = false;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.raised = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.raised = false;
  }

}
