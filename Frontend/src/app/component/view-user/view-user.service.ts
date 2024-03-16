import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Page } from '../../service/data.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {

  url: string = '';

  constructor(private http: HttpClient) { }

  getItems(search: string, page: number, size: number): Observable<Page> {

    const params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page>(`${environment.userUrl}getAll`, { params });

  }

  getDetails(role: string, email: string): Observable<any> {

    if (role === 'JOBSEEKER')
      this.url = environment.jobseekerUrl;
    else if (role === 'RECRUITER')
      this.url = environment.recruiterUrl;
    else
      this.url = environment.userUrl;

    return this.http.get<any>(`${this.url}getEmail/${email}`);

  }

  updateStatus(id: string, status: string): Observable<Page> {
    return this.http.put<Page>(`${environment.userUrl}update-status/${id}/${status}`, '');
  }
}
