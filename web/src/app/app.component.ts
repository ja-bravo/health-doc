import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public page;
  public isLogin = false;
  constructor(private router: Router) {
    this.page = this.router.url === '/' ? 'Dashboard' : this.getTitle(this.router.url);
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.page = this.router.url === '/' ? 'Dashboard' : this.getTitle(this.router.url);
        this.isLogin = this.router.url.indexOf('login') > -1;
      }
    });
  }

  private getTitle(url) {
    const title = url.split('-').join(' ').slice(1);
    return title;
  }
}
