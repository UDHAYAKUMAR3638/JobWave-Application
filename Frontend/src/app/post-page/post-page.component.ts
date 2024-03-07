import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostPageService } from './post-page.service';
import { LoginService } from '../login/login.service';
declare const Razorpay: any;

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent {

  constructor(private fb: FormBuilder,
    private postService: PostPageService,
    private loginService: LoginService) { }

  paymentDetails!: any;
  perPostCost = 900;
  userDetails!: any;

  ngOnInit() {
    this.loginService.getUser().subscribe({
      next: (data: any) => {
        this.userDetails = data;
        this.postForm.get('companyName')?.setValue(this.userDetails.companyName);
        this.postForm.get('location')?.setValue(this.userDetails.location);
        this.postForm.get('recruiterId')?.setValue({ _id: this.userDetails._id });
      }
    })
  }

  postForm = this.fb.group({
    companyName: '',
    role: ['', Validators.required],
    location: [, Validators.required],
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

  payment() {
    if (!this.postForm.invalid) {
      this.postService.createOrder(this.perPostCost).subscribe({
        next: (data: any) => {
          // console.log(data);
          this.openTransactionModel(data);
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }
    else {
      Swal.fire({
        title: 'Complete all fields',
        icon: 'error'
      })
    }
  }

  openTransactionModel(response: any) {

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

      handler: (response: any) => {
        if (response != null && response.razorpay_payment_id != null)
          this.processResponse(response);
        else
          alert('Payment failed..');
      },

      notes: {
        address: 'charges for job post'
      },

      theme: {
        color: '#F37254'
      },

      modal: {
        ondismiss: () => {
          console.log('dismissed');
        }
      }

    };

    const razorpayObject: any = new Razorpay(options);
    razorpayObject.open();

  }

  processResponse(response: any) {

    this.paymentDetails = response;

    this.register();
  }

  register() {

    this.postForm.get('date')?.setValue(new Date());

    this.postService.post(this.postForm.value).subscribe({
      next: (data: { _id: string; }) => {
        this.postService.savePayment(data._id, this.paymentDetails, this.userDetails, this.perPostCost);
        Swal.fire({
          title: 'Post added Successfully',
          icon: 'success'
        })
      },

      error: (error: any) => {
        console.log(error);
      }

    });
  }

}
