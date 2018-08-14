import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public page;
  constructor(private router: Router) {
    this.page = this.router.url === '/' ? 'Dashboard' : this.getTitle(this.router.url);
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.page = this.router.url === '/' ? 'Dashboard' : this.getTitle(this.router.url);
      }
    });
  }

  private getTitle(url) {
    const title = url.split('-').join(' ').slice(1);
    return title;
  }
}
