import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Jobseeker } from '../find-applicant/find-applicant.service';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { User } from '../add-user/add-user.service';
export interface Login {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})

export class LoginService {

  constructor(private http: HttpClient) { }

  authenticate(data: Login): Observable<any> {
    const response: any = this.http.post<any>(environment.baseUrl + '/authenticate', data, { observe: 'response' });
    return response;
  }

  getUser(): Observable<any> {

    if (sessionStorage.getItem('role') === 'JOBSEEKER')
      return this.http.get<Jobseeker>(
        `${environment.jobseekerUrl}/getEmail/${sessionStorage.getItem('email')}`);

    else if (sessionStorage.getItem('role') === 'RECRUITER')
      return this.http.get<Recruiter>(
        `${environment.recruiterUrl}/getEmail/${sessionStorage.getItem('email')}`);

    else
      return this.http.get<User>(
        `${environment.userUrl}/getEmail/${sessionStorage.getItem('email')}`);

  }

  isAuthencticate(): boolean {
    return sessionStorage.getItem('isLogged') === 'true';
  }

  hasRole(roles: string[]): boolean {
    return roles.includes(sessionStorage.getItem('role') || '');
  }
}
