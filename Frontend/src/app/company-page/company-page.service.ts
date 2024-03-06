import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from 'lodash';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompanyPageService {

  constructor(private http: HttpClient) { }

  getCompany(companyName: string, pageIndex: number, pageSize: number) {
    const params = new HttpParams()
      .set('companyName', companyName)
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);
    return this.http.get<List<any>>(`${environment.recruiterUrl}/getAll`, { params });
  }
}
