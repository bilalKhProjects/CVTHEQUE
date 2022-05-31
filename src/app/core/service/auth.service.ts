import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Candidat } from '../models/candidat.model';

const jwt= new JwtHelperService;
class DecodedToken {
  exp!: number;
  username!: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uriseg='http://localhost:5000/api/users';
  private decodedToken;

  constructor(private http: HttpClient) { this.decodedToken = JSON.parse(localStorage.getItem('auth_meta')) || new DecodedToken(); }
  public register(userData:any):Observable<any>{
    const URI=this.uriseg+'/register';
    return this.http.post(URI, userData);
  }

  public login (userData:any):Observable<any>{
    const URI=this.uriseg+'/login';
    return this.http.post(URI,userData).pipe(map(token=>{
      return this.saveToken(token);
    }))
  }

  saveToken(token: any): any {
    this.decodedToken= jwt.decodeToken(token);
    localStorage.setItem('auth_tkn',token);
    localStorage.setItem('auth_meta',JSON.stringify(this.decodedToken));
    return token;
  }
  public logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');
    this.decodedToken=new DecodedToken();
  }
  
public isAuthenticated(): boolean {
  return moment().isBefore(moment.unix(this.decodedToken.exp));
}
public getUsername(): string {
  return this.decodedToken.username;
}
}


