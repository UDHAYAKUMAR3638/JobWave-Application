import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
export interface User {
  email: string | null,
  name: string | null,
  password: string | null,
  role: string | null
}

@Injectable({
  providedIn: 'root'
})

export class AddUserService {

  constructor(private http: HttpClient) { }

  addUser(user: User) {

    if (user.role === 'JOBSEEKER')
      return this.http.post<User>(`${environment.userUrl}/register/jobseeker`, user);

    else if (user.role === 'RECRUITER')
      return this.http.post<User>(`${environment.userUrl}/register/recruiter`, user);

    else
      return this.http.post<User>(`${environment.userUrl}/register`, user);
  }

}
