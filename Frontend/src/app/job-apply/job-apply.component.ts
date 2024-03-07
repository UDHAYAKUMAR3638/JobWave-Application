import { Component } from '@angular/core';
import { JobApplyService, JobApplication } from './job-apply.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.scss']
})


export class JobApplyComponent {
  postId!: string;
  file: File | null = null;
  constructor(private fb: FormBuilder,
    private jobService: JobApplyService,
    private loginService: LoginService,
    private dataService: DataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('postId') || '';
    // this.dataService.messageSource.subscribe({
    //   next: (id) => {
    //     this.postId = id;
    //   }
    // })
    this.loginService.getUser().subscribe({
      next: (details: { name: any; email: any; phoneno: any; skills: any; _id: any; }) => {
        this.jobApplicationForm = this.fb.group({
          name: [details.name, Validators.required],
          email: [details.email, [Validators.email, Validators.required]],
          phoneno: [details.phoneno, [Validators.required, Validators.maxLength(10)]],
          skills: [details.skills, [Validators.required,]],
          experience: '',
          postId: { _id: this.postId },
          userId: { _id: details._id },
        });
      }
    });
  }

  upload(event: any) {
    this.file = event.target.files[0];
  }

  jobApplicationForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    phoneno: ['', [Validators.required, Validators.maxLength(10)]],
    skills: ['', [Validators.required, Validators.required]],
    experience: ['', [Validators.required, Validators.required]],
    postId: { _id: '' },
    userId: { _id: '' },
  });

  apply() {
    const formData: FormData = new FormData();
    formData.append('name', this.jobApplicationForm.get('name')!.value || '');
    formData.append('email', this.jobApplicationForm.get('email')?.value || '');
    formData.append('phoneno', this.jobApplicationForm.get('phoneno')?.value || '');
    formData.append('skills', this.jobApplicationForm.get('skills')?.value || '');
    formData.append('experience', this.jobApplicationForm.get('experience')?.value || '');
    formData.append('postId', this.jobApplicationForm.get('postId')?.value?._id || '');
    formData.append('userId', this.jobApplicationForm.get('userId')?.value?._id || '');
    formData.append('status', 'Pending');
    formData.append('resume', this.file || '');
    if (!this.jobApplicationForm.invalid) {
      this.jobService.apply(formData).subscribe({
        next: (data: any) => {
          Swal.fire({
            title: 'Application sent successfully',
            icon: 'success'
          })
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }
}
