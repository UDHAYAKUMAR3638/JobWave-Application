import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Post } from '../post-page/post-page.service';

export interface Bill {

  _id: string,
  postId: Post,
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

  getBills() {
    return this.http.get(`${environment.paymentUrl}/bills/${sessionStorage.getItem('email')}`);
  }
}
