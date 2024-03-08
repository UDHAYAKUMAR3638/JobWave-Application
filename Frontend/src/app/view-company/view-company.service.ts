import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { environment } from 'src/environments/environment.development';
import { Post } from '../post-page/post-page.service';
import { List } from 'lodash';
import { Observable } from 'rxjs';
import { Page } from '../service/data.service';

@Injectable({
  providedIn: 'root'
})
export class ViewCompanyService {

  constructor(private http: HttpClient) { }

  getCompany(id: String): Observable<Recruiter> {
    return this.http.get<Recruiter>(`${environment.recruiterUrl}/getById/${id}`);
  }

  getCompanyPosts(id: string, pageIndex: number, pageSize: number): Observable<Page> {
    const params = new HttpParams()
      .set('id', id)
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);
    return this.http.get<Page>(`${environment.recruiterUrl}/getPosts`, { params });
  }

  updateCompany(companyId: string, jobseekerEmail: string, rating: number): Observable<any> {
    return this.http.post<any>(`${environment.ratingUrl}/post`, { companyId: { _id: companyId }, jobseekerEmail, rating });
  }
}
