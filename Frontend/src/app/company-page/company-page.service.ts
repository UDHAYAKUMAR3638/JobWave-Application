import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from 'lodash';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Page } from '../service/data.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyPageService {

  constructor(private http: HttpClient) { }

  getCompany(companyName: string, pageIndex: number, pageSize: number): Observable<Page> {
    const params = new HttpParams()
      .set('companyName', companyName)
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);
    return this.http.get<Page>(`${environment.recruiterUrl}/getAll`, { params });
  }
}
