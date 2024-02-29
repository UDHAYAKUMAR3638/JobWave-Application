import { Component } from '@angular/core';
import { JobApplyService, jobApplication } from './job-apply.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.scss']
})


export class JobApplyComponent {



  constructor(private fb: FormBuilder, private jobService: JobApplyService, private route: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.messageSource.subscribe({
      next: (id) => {
        this.postId = id;
      }
    })
  }

  jobApplicationForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    phoneno: ['', [Validators.required, Validators.maxLength(10)]],
    skills: '',
    resume: '',
    experience: '',
    postId: {
      _id: ""
    }
  });

  postId!: string;


  apply() {
    this.jobApplicationForm.get('postId')?.setValue({ _id: this.postId });
    console.log(this.jobApplicationForm.value);
    if (!this.jobApplicationForm.invalid) {
      this.jobService.apply(<jobApplication>this.jobApplicationForm.value).subscribe({
        next: (data) => {
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
