import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public user;
  public password;

  constructor(private service: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  async signIn() {
    if (this.user && this.password) {
      const result = await this.service.signIn(this.user, this.password);

      if (result.token) {
        localStorage.setItem('jwt', result.token);
        this.router.navigateByUrl('/');
      } else {
        this.snackBar.open('Incorrent user or password.');
      }
    } else {
      this.snackBar.open('Missing user or password.');
    }
  }
}
