import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [LoginPageComponent, RegisterPageComponent]
})
export class LoginModule { }
