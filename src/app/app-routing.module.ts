import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogInComponent} from './features/components/log-in/log-in.component'
import { ProfileComponent } from './features/components/profile/profile.component';
import { RegisterComponent } from './features/components/register/register.component';
import { AuthGuard } from './core/service/auth.guard';
import { CvsComponent } from './features/components/cvs/cvs.component';
import { AddcandidatComponent } from './features/components/addcandidat/addcandidat.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  {path : 'profil', component:ProfileComponent,canActivate: [AuthGuard]},
  { path: 'cv', component: CvsComponent,canActivate: [AuthGuard] },
  { path: 'add', component: AddcandidatComponent,canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
