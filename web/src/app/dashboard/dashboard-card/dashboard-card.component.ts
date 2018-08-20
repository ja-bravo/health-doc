import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() route;
  @Input() passive;
  
  public raised = false;

  constructor(private router: Router) { }

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

  @HostListener('click')
  onClick() {
    this.router.navigateByUrl(this.route);
  }

}
