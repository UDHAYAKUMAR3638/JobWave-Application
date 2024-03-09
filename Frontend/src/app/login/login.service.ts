import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Jobseeker } from '../find-applicant/find-applicant.service';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { User } from '../add-user/add-user.service';
import { Router } from '@angular/router';
export interface Login {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})

export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  urlPath: string = '';

  authenticate(data: Login): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}authenticate`, data, { observe: 'response' });;
  }

  getUser(): Observable<any> {

    if (sessionStorage.getItem('role') === 'JOBSEEKER')
      this.urlPath = environment.jobseekerUrl;
    else if (sessionStorage.getItem('role') === 'RECRUITER')
      this.urlPath = environment.recruiterUrl;
    else
      this.urlPath = environment.userUrl
    return this.http.get<any>(`${this.urlPath}getEmail/${sessionStorage.getItem('email')}`);

  }

  isAuthencticate(): boolean {
    return sessionStorage.getItem('isLogged') === 'true';
  }

  hasRole(roles: string[]): boolean {
    return roles.includes(sessionStorage.getItem('role') || '');
  }
}
