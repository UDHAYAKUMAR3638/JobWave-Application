import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyPageService {

  constructor(private http: HttpClient) { }

  getCompany(companyName: string, pageIndex: number, pageSize: number): Observable<{ content: Array<Recruiter>, totalElements: number }> {
    const params = new HttpParams()
      .set('companyName', companyName)
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);
    return this.http.get<{ content: Array<Recruiter>, totalElements: number }>(`${environment.recruiterUrl}getAll`, { params });
  }
}
