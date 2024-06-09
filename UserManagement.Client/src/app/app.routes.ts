import { Routes } from '@angular/router';
import { UserListComponent } from './components/userlist/userlist.component';
import { AppComponent } from './app.component';
import '@angular/compiler';
import { LoginComponent } from './components/login/login.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { ErrorComponent } from './components/error/error.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'userlist',component:UserListComponent,canActivate: [AuthGuard]},
    {path:'adduser',component:AdduserComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' }},
    {path:'edituser/:id',component:EdituserComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' }},
    { path: 'access-denied', component: AccessDeniedComponent },
    {path:'**',component:ErrorComponent},
];
