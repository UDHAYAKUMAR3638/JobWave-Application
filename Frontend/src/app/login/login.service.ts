import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment.development';
export interface login {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})

export class LoginService {
  loggedStatus = false;
  constructor(private http: HttpClient) { }

  authenticate(data: login): Observable<any> {
    const response: any = this.http.post<any>(environment.baseUrl + '/authenticate', data, { observe: 'response' });
    return response;
  }

  getUser() {
    if (sessionStorage.getItem('role') === 'CANDIDATE')
      return this.http.get<any>(
        environment.patUrl + `/getEmail/${sessionStorage.getItem('email')}`);
    else if (sessionStorage.getItem('role') === 'RECURITER')
      return this.http.get<any>(
        environment.docUrl + `/getEmail/${sessionStorage.getItem('email')}`);
    else
      return this.http.get<any>(
        environment.userUrl + `/getEmail/${sessionStorage.getItem('email')}`);
  }

  isAuthencticate(): boolean {
    this.loggedStatus = sessionStorage.getItem('isLogged') === 'true';
    return this.loggedStatus;
  }
}
