import { Component } from '@angular/core';
import { JobApplyService, jobApplication } from './job-apply.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.scss']
})
export class JobApplyComponent {

  constructor(private fb: FormBuilder, private jobService: JobApplyService, private route: Router) { }

  jobApplicationForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    phoneno: ['', [Validators.required, Validators.maxLength(10)]],
    skills: '',
    resume: '',
    experience: '',
    postId: {
      _id: "65dcd2714f1e0bf6f5bb6992"
    }
  });

  apply() {
    if (!this.jobApplicationForm.invalid) {
      this.jobService.apply(<jobApplication>this.jobApplicationForm.value).subscribe({
        next: (data) => {
          console.log(data);
          Swal.fire({
            title: 'Application sent successful!',
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
