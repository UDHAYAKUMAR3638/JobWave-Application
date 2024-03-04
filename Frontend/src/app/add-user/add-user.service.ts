import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
export interface User {
  email: string | null,
  name: string | null,
  password: string | null,
  role: string | null,
  image: File
}

@Injectable({
  providedIn: 'root'
})

export class AddUserService {

  constructor(private http: HttpClient) { }

  addUser(user: User) {
    const userData = new FormData();
    userData.append('name', user.name || '');
    userData.append('email', user.email || '');
    userData.append('password', user.password || '');
    userData.append('role', user.role || '');
    userData.append('image', new Blob([]));

    if (user.role === 'JOBSEEKER')
      return this.http.post<User>(`${environment.userUrl}/register/jobseeker`, userData);

    else if (user.role === 'RECRUITER')
      return this.http.post<User>(`${environment.userUrl}/register/recruiter`, userData);

    else
      return this.http.post<User>(`${environment.userUrl}/register`, userData);
  }

}
