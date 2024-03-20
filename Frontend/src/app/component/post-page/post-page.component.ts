import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order, PostForm, PostPageService, RazorPay } from './post-page.service';
import { LoginService } from '../login/login.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../../service/alert.service';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { Bill } from '../bills-page/bills-page.service';
import { User } from '../profile/profile.service';
declare const Razorpay: any;

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent {

  constructor(private formBuilder: FormBuilder,
    private postService: PostPageService,
    private loginService: LoginService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loginApi = this.loginService.getUser().subscribe({
      next: (data: User) => {
        this.userDetails = data;
        this.postForm.get('companyName')?.setValue(this.userDetails.companyName);
        this.postForm.get('location')?.setValue(this.userDetails.location);
        this.postForm.get('recruiterId')?.setValue({ _id: this.userDetails._id });
      }
    });

  }

  paymentDetails!: RazorPay;
  perPostCost = 900;
  userDetails!: User;
  postApi: Subscription = new Subscription();
  orderApi: Subscription = new Subscription();
  loginApi: Subscription = new Subscription();
  postForm = this.formBuilder.group({
    companyName: '',
    role: ['', Validators.required],
    location: ['', Validators.required],
    salary: ['', Validators.required],
    jobType: ['Select job type', Validators.required],
    schedule: ['Select work schedule', Validators.required],
    content: ['', Validators.required],
    education: ['', Validators.required],
    skills: '',
    benifits: '',
    language: '',
    date: new Date(),
    recruiterId: { _id: '' },
    status: 'Open'
  });

  payment(): void {

    if (!this.postForm.invalid) {
      this.orderApi = this.postService.createOrder(this.perPostCost).subscribe({
        next: (data: Order) => {
          this.openTransactionModel(data);
        },
      })
    }
    else {
      this.alertService.alertMessage('Complete all fields', '', 'warning');
    }
  }

  openTransactionModel(response: Order): void {

    const options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'Job Wave',
      description: 'Payment of job post',
      image: 'https://img.freepik.com/free-vector/mobile-bank-users-transferring-money-currency-conversion-tiny-people-online-payment-cartoon-illustration_74855-14454.jpg',
      prefill: {
        name: "udhaya" || this.userDetails.name,
        email: "udhaya@gmail.com" || this.userDetails.email,
      },

      handler: (response: RazorPay) => {

        if (response != null && response.razorpay_payment_id != null)
          this.processResponse(response);
        else
          this.alertService.alertMessage('Payment failed', '', 'error');
      },

      notes: {
        address: 'charges for job post'
      },

      theme: {
        color: '#2557A7'
      },

      modal: {
        ondismiss: () => {
          this.alertService.alertMessage('Payment cancelled', '', 'warning');
        }
      }

    };

    const razorpayObject: any = new Razorpay(options);
    razorpayObject.open();

  }

  processResponse(response: RazorPay): void {
    this.paymentDetails = response;
    this.register();

  }

  register(): void {
    this.postForm.get('date')?.setValue(new Date());
    this.postApi = this.postService.post(<PostForm>this.postForm.value).subscribe({
      next: (data: { _id: string; }) => {
        this.postService.savePayment(data._id, this.paymentDetails, this.userDetails, this.perPostCost).subscribe({
          next: (data: Bill) => {
            this.postForm.reset();
          }
        })
        this.alertService.alertMessage('Post added Successfully', 'redirected to your posts', 'success');
        this.router.navigate(['myPost']);
      },

    });

  }

  ngOnDestroy(): void {
    this.loginApi.unsubscribe();
    this.orderApi.unsubscribe();
    this.postApi.unsubscribe();
  }

}
