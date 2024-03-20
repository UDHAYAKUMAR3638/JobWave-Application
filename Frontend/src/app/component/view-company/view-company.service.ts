import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { environment } from 'src/environments/environment.development';
import { Post } from '../post-page/post-page.service';
import { Observable } from 'rxjs';
export interface Rating {
  _id: String,
  companyId: Recruiter,
  jobseekerEmail: String,
  rating: number
}
@Injectable({
  providedIn: 'root'
})
export class ViewCompanyService {

  constructor(private http: HttpClient) { }

  getCompany(id: String): Observable<Recruiter> {
    return this.http.get<Recruiter>(`${environment.recruiterUrl}getById/${id}`);
  }

  getCompanyPosts(id: string, pageIndex: number, pageSize: number): Observable<{ content: Post[]; totalElements: number; }> {
    const params = new HttpParams()
      .set('id', id)
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);
    return this.http.get<{ content: Post[]; totalElements: number; }>(`${environment.recruiterUrl}getPosts`, { params });
  }

  updateCompany(companyId: string, jobseekerEmail: string, rating: number): Observable<Rating> {
    return this.http.post<Rating>(`${environment.ratingUrl}post`, { companyId: { _id: companyId }, jobseekerEmail, rating });
  }

  getRating(companyId: string): Observable<Rating> {
    const params = new HttpParams()
      .set("companyId", companyId)
      .set('email', sessionStorage.getItem('email') || '');
    return this.http.get<Rating>(`${environment.ratingUrl}get-rating`, { params });
  }
}
