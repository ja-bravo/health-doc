import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { NotFirstTimeService } from '../shared/guards/notFirstTime';
import { FirstTimeService } from '../shared/guards/firstTime';


const routes: Routes = [
  {path: '', component: LoginPageComponent, canActivate: [NotFirstTimeService]},
  {path: 'register', component: RegisterPageComponent, canActivate: [FirstTimeService]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
