import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/service/auth.service';
import { AuthGuard } from 'src/app/core/service/auth.guard';
import { RegisterComponent } from '../../components/register/register.component';
import { LogInComponent } from '../../components/log-in/log-in.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../../components/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CvsComponent } from '../../components/cvs/cvs.component';
import { AddcandidatComponent } from '../../components/addcandidat/addcandidat.component';
import { DeletecandidatComponent } from '../../components/deletecandidat/deletecandidat.component';
import { UpdatecandidatComponent } from '../../components/updatecandidat/updatecandidat.component';
import { DetailscandidatComponent } from '../../components/detailscandidat/detailscandidat.component';
@NgModule({
  declarations: [RegisterComponent,LogInComponent,ProfileComponent, CvsComponent, AddcandidatComponent, DeletecandidatComponent, UpdatecandidatComponent, DetailscandidatComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    SharedModule
  ],
  providers: [AuthService, AuthGuard]
})
export class AuthModule { }

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LogInComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] }
    ]
  }
];
