import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/guards/isLogged';

const routes: Routes = [
    { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuardService] },
    { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule', canActivate: [AuthGuardService] },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
