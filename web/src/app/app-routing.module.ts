import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule' },
    { path: 'login', loadChildren: './login/login.module#LoginModule'},
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
