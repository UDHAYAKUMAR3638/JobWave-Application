import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../profile/profile.service';
export interface Login {
  email: string;
  password: string;
}

export interface UserDetails {
  token: string,
  user: {
    email: string,
    image: string,
    name: string,
    password: string,
    role: { _id: string, role: string }
    status: string,
    username: string
    _id: string

  }
}
@Injectable({
  providedIn: 'root',
})

export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  urlPath: string = '';

  authenticate(data: Login): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${environment.baseUrl}authenticate`, data);
  }

  getUser(): Observable<User> {

    if (sessionStorage.getItem('role') === 'JOBSEEKER')
      this.urlPath = environment.jobseekerUrl;
    else if (sessionStorage.getItem('role') === 'RECRUITER')
      this.urlPath = environment.recruiterUrl;
    else
      this.urlPath = environment.userUrl

    return this.http.get<User>(`${this.urlPath}getEmail/${sessionStorage.getItem('email')}`);

  }

  isAuthencticate(): boolean {
    return sessionStorage.getItem('isLogged') === 'true';
  }

  hasRole(roles: string[]): boolean {
    return roles.includes(sessionStorage.getItem('role') || '');
  }
}
