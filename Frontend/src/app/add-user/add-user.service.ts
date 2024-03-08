import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  path: string = '';

  addUser(user: User): Observable<User> {
    const userData = new FormData();
    userData.append('name', user.name || '');
    userData.append('email', user.email || '');
    userData.append('password', user.password || '');
    userData.append('role', user.role || '');
    userData.append('image', new Blob([]));

    if (user.role === 'JOBSEEKER')
      this.path = 'register/jobseeker';

    else if (user.role === 'RECRUITER')
      this.path = 'register/recruiter';

    else
      this.path = 'register';

    return this.http.post<User>(`${environment.userUrl}/${this.path}`, userData);

  }

}
