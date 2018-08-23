import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class NotFirstTimeService implements CanActivate {
  constructor(public auth: UserService, public router: Router) { }
  async canActivate(): Promise<boolean> {
    const isFirstTime = await this.auth.isFirstTime();
    if (isFirstTime) {
      this.router.navigateByUrl('/login/register');
      return false;
    }
    return true;
  }
}