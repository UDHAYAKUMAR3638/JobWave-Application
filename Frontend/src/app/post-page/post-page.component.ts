import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostPageService, post } from './post-page.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent {
  submit() {
  }
  constructor(private fb: FormBuilder, private postService: PostPageService, private route: Router) { }

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

  register() {
    if (!this.postForm.invalid) {
      this.postService.post(this.postForm.value).subscribe({
        next: (data) => {
          console.log(data);
          Swal.fire({
            title: 'Post insertion Successful!',
            icon: 'success'
          })
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}
