import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../profile/profile.service';
import { AddUser } from '../add-user/add-user.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {

  url: string = '';

  constructor(private http: HttpClient) { }

  getItems(search: string, page: number, size: number): Observable<{ totalElements: number; content: Array<AddUser>; }> {

    const params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<{ totalElements: number; content: Array<AddUser>; }>(`${environment.userUrl}getAll`, { params });

  }

  getDetails(role: string, email: string): Observable<User> {

    if (role === 'JOBSEEKER')
      this.url = environment.jobseekerUrl;
    else if (role === 'RECRUITER')
      this.url = environment.recruiterUrl;
    else
      this.url = environment.userUrl;

    return this.http.get<User>(`${this.url}getEmail/${email}`);

  }

  updateStatus(id: string, status: string): Observable<{ totalElements: number; content: Array<AddUser>; }> {
    return this.http.put<{ totalElements: number; content: Array<AddUser>; }>(`${environment.userUrl}update-status/${id}/${status}`, '');
  }
}
