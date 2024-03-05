import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  getItems(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(environment.userUrl + '/getAll', { params });
  }

  getDetails(role: string, email: string) {
    if (role === 'JOBSEEKER')
      return this.http.get<any>(
        `${environment.jobseekerUrl}/getEmail/${email}`);
    else if (role === 'RECRUITER')
      return this.http.get<any>(
        `${environment.recruiterUrl}/getEmail/${email}`);
    else
      return this.http.get<any>(
        `${environment.userUrl}/getEmail/${email}`);
  }
}
