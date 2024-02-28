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
  constructor(private http: HttpClient) { }

  authenticate(data: login): Observable<any> {
    const response: any = this.http.post<any>(environment.baseUrl + '/authenticate', data, { observe: 'response' });
    return response;
  }

  getUser() {
    if (sessionStorage.getItem('role') === 'JOBSEEKER')
      return this.http.get<any>(
        environment.jobseekerUrl + `/getEmail/${sessionStorage.getItem('email')}`);
    else if (sessionStorage.getItem('role') === 'RECRUITER')
      return this.http.get<any>(
        environment.recruiterUrl + `/getEmail/${sessionStorage.getItem('email')}`);
    else
      return this.http.get<any>(
        environment.userUrl + `/getEmail/${sessionStorage.getItem('email')}`);
  }

  isAuthencticate(): boolean {
    return sessionStorage.getItem('isLogged') === 'true';
  }
}
