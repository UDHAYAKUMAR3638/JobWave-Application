import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostPageService, post } from './post-page.service';
declare const Razorpay: any;

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent {

  constructor(private fb: FormBuilder, private postService: PostPageService, private route: Router) { }

  paymentDetails!: any;
  perPostCost = 900;
  user: any = sessionStorage.getItem('user');
  userDetails = JSON.parse(this.user);

  payment() {
    if (!this.postForm.invalid) {
      this.postService.createOrder(this.perPostCost).subscribe({
        next: (data) => {
          // console.log(data);
          this.openTransactionModel(data);
        },
        error: (error) => {
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
        name: this.userDetails.name,
        email: this.userDetails.email,
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
    this.postService.post(this.postForm.value).subscribe({
      next: (data) => {
        this.postService.savePayment(data._id, this.paymentDetails, this.userDetails, this.perPostCost);
        Swal.fire({
          title: 'Post added Successfully',
          icon: 'success'
        })
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  postForm = this.fb.group({
    companyName: '',
    role: ['', Validators.required],
    location: [, Validators.required],
    salary: ['', Validators.required],
    jobType: ['', Validators.required],
    schedule: ['', Validators.required],
    content: ['', Validators.required],
    education: ['', Validators.required],
    skills: '',
    benifits: '',
    language: '',
    date: new Date(),
    recruiterId: { _id: "65dd6d9751aaae72f34241fc" }
  });


}
