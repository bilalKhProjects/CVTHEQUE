import { NgModule,APP_INITIALIZER } from '@angular/core';
import { AuthService} from './service/auth.service'
import { AuthGuard} from './service/auth.guard'
import { CandidatService } from './service/candidat.service';
import { JwtInterceptor} from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [],
  imports: [],
  providers: [AuthService, AuthGuard, CandidatService]
})
export class CoreModule { }
