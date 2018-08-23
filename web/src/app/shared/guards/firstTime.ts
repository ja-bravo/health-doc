import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class FirstTimeService implements CanActivate {
  constructor(public auth: UserService, public router: Router) { }
  async canActivate(): Promise<boolean> {
    const isFirstTime = await this.auth.isFirstTime();
    if (isFirstTime) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
