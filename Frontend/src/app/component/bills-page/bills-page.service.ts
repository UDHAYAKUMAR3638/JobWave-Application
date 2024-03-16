import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Post } from '../post-page/post-page.service';
import { Observable } from 'rxjs';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { Page } from '../../service/data.service';

export interface Bill {

  _id: string,
  postId: Post,
  recruiterId: Recruiter,
  paymentId: string,
  orderId: string,
  name: string,
  email: string,
  amount: number
}

@Injectable({
  providedIn: 'root'
})


export class BillsPageService {

  constructor(private http: HttpClient) { }

  getBills(pageIndex: number, pageSize: number): Observable<Page> {
    const params = new HttpParams()
      .set('email', sessionStorage.getItem('email') || '')
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);
    return this.http.get<any>(`${environment.paymentUrl}bills`, { params });
  }

  getAllBills(pageIndex: number, pageSize: number): Observable<Page> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);
    return this.http.get<Page>(`${environment.paymentUrl}getAllBills`, { params });
  }
}
