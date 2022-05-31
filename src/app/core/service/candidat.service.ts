import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidat } from '../models/candidat.model';
import { formatDate } from '@angular/common';


const jwt= new JwtHelperService;

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private uricand='http://localhost:5000/api/candidats'
  

  constructor(private http: HttpClient) { }
  public addCandidat(candidatsData:Candidat):Observable<any>{
    const URI=this.uricand+'/'
    let data = new FormData()
    let headers = new HttpHeaders({Authorization:'Bearer '+localStorage.getItem('auth_tkn')});
    data.append('cin',candidatsData?.cin)
    data.append('lastName',candidatsData?.lastName)
    data.append('name',candidatsData?.name)
    data.append('gender',candidatsData?.gender)
    data.append('age',candidatsData?.age+'')
    data.append('city',candidatsData?.city)
    data.append('exp',candidatsData?.exp)
    data.append('cv',candidatsData?.cv)
    return this.http.post(URI,data, {headers});
  }

  public getCandidat():Observable<Candidat[]>{
    const URI=this.uricand+'/'
    let headers = new HttpHeaders({Authorization:'Bearer '+localStorage.getItem('auth_tkn')});
    return this.http.get<Candidat[]>(URI,{headers});
  }

  public getByIdCandidat(id:string):Observable<Candidat[]>{
    const URI=this.uricand+'/'+id
    let headers = new HttpHeaders({Authorization:'Bearer '+localStorage.getItem('auth_tkn')});
    return this.http.get<Candidat[]>(URI,{headers});
  }

  public deleteCandidat(id:string):Observable<Candidat[]>{
    const URI=this.uricand+'/'+id
    let headers = new HttpHeaders({Authorization:'Bearer '+localStorage.getItem('auth_tkn')});
    return this.http.delete<Candidat[]>(URI,{headers});
  }

  public updateCandidat(candidatsData:Candidat,id:string):Observable<Candidat[]>{
    const URI=this.uricand+'/'+id
    let headers = new HttpHeaders({Authorization:'Bearer '+localStorage.getItem('auth_tkn')});
    let data = new FormData()
    data.append('cin',candidatsData?.cin)
    data.append('lastName',candidatsData?.lastName)
    data.append('name',candidatsData?.name)
    data.append('gender',candidatsData?.gender)
    data.append('age',candidatsData?.age+'')
    data.append('city',candidatsData?.city)
    data.append('exp',candidatsData?.exp)
    data.append('cv',candidatsData?.cv)
    return this.http.put<Candidat[]>(URI,data,{headers});
  }

}
