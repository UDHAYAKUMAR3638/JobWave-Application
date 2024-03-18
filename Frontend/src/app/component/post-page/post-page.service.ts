import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { Bill } from '../bills-page/bills-page.service';
export interface RazorPay {
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
}
export interface Order {
    amount: number,
    currency: string,
    id: string,
    key: string,
    orderId: string,
}
export interface Post {
    _id: string,
    role: string,
    location: string,
    salary: string,
    jobType: string,
    skills: string,
    schedule: string,
    content: string,
    education: string,
    benifits: string,
    language: string,
    date: Date,
    recruiterId: Recruiter,
    status: string,
}

export interface PostForm {
    companyName: string,
    role: string,
    location: string,
    salary: string,
    jobType: string,
    schedule: string,
    content: string,
    education: string,
    skills: string,
    benifits: string,
    language: string,
    date: Date,
    recruiterId: Recruiter,
    status: string
}
@Injectable({
    providedIn: 'root'
})

export class PostPageService {

    constructor(private http: HttpClient) { }

    post(data: PostForm): Observable<Post> {
        return this.http.post<Post>(`${environment.recruiterUrl}post`, data);
    }

    createOrder(amount: number): Observable<Order> {
        return this.http.get<Order>(`${environment.paymentUrl}createTransaction/${amount}`);
    }

    savePayment(postId: string, paymentDetails: RazorPay, userDetails: Recruiter, price: number): Observable<Bill> {

        const payment = { postId: { _id: postId }, paymentId: paymentDetails.razorpay_payment_id, orderId: paymentDetails.razorpay_order_id, name: userDetails.name, email: userDetails.email, amount: price };
        return this.http.post<Bill>(`${environment.paymentUrl}save`, payment);

    }

}
