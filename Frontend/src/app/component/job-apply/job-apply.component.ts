import { Component } from '@angular/core';
import { JobApplyService, JobApplication } from './job-apply.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { LoginService } from '../login/login.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../../service/alert.service';
import { Jobseeker } from '../find-applicant/find-applicant.service';

@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.scss']
})


export class JobApplyComponent {

  postId!: string;
  file: File | null = null;
  loginApi: Subscription = new Subscription();
  jobApi: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder,
    private jobService: JobApplyService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.postId = this.route.snapshot.paramMap.get('postId') || '';
    this.loginApi = this.loginService.getUser().subscribe({
      next: (details) => {
        this.jobApplicationForm.patchValue({
          name: details.name,
          email: details.email,
          phoneno: details.phoneno,
          skills: details.skills,
          experience: '',
          postId: { _id: this.postId },
          userId: { _id: details._id },
        });
      }

    });

  }

  upload(event: any): void {
    this.file = event.target.files[0];
  }

  jobApplicationForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    phoneno: ['', [Validators.required, Validators.maxLength(10)]],
    skills: ['', [Validators.required, Validators.required]],
    experience: ['', [Validators.required, Validators.required]],
    postId: { _id: '' },
    userId: { _id: '' },
  });

  apply(): void {

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

    if (!this.jobApplicationForm.invalid && this.file) {
      this.jobApi = this.jobService.apply(formData).subscribe({
        next: (data: JobApplication) => {
          this.alertService.alertMessage('Application sent successfully', ``, 'success');
          this.router.navigate(['myJob']);
        },

      });
    }
    else
      this.alertService.alertMessage('Complete all fields', ``, 'warning');
  }

  ngOnDestroy() {
    this.loginApi.unsubscribe();
    this.jobApi.unsubscribe();
  }

}
