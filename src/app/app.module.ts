import { BrowserModule } from '@angular/platform-browser';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { CoreModule, FlexLayoutModule } from "@angular/flex-layout";

/* Components */
import { LogInComponent } from './features/components/log-in/log-in.component';
import { RegisterComponent } from './features/components/register/register.component';
import {AuthModule} from './features/module/auth/auth.module'
import {AuthService} from './core/service/auth.service'
import {AuthGuard} from './core/service/auth.guard'
import {ProfileComponent} from './features/components/profile/profile.component'
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {SharedModule} from '../app/shared/shared.module'
import { Candidat } from './core/models/candidat.model';

@NgModule({
  declarations: [
    AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    AuthModule,
    CoreModule,
    AngularMaterialModule,
    SharedModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }