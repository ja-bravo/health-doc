import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public user;
  public password;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
  }

  async register() {
    if (this.user && this.password) {
      const token = await this.service.register(this.user, this.password);
      if (token) {
        localStorage.setItem('jwt', token);
        this.router.navigateByUrl('/');
      }
    }
  }
}
