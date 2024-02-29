import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
export interface post {
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
    language: any,
    date: Date,
    companyName: string,
    recruiterId: { _id: string }
}
@Injectable({
    providedIn: 'root'
})
export class PostPageService {

    constructor(private http: HttpClient) {
    }

    post(data: any): Observable<any> {
        return this.http.post<any>(environment.recruiterUrl + "/post", data);
    }

    createOrder(amount: number) {
        return this.http.get(`${environment.paymentUrl}/createTransaction/${amount}`);
    }

    savePayment(postId: string, paymentDetails: any, userDetails: any, price: number) {
        const payment = { postId: { _id: postId }, paymentId: paymentDetails.razorpay_payment_id, orderId: paymentDetails.razorpay_order_id, name: userDetails.name, email: userDetails.email, amount: price };
        // console.log(payment);
        this.http.post(`${environment.paymentUrl}/save`, payment).subscribe({
            next: (data) => {
                // console.log(data);
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

}
