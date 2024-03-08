import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileCompletionService } from './jobseeker-profile-completion.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../service/alert.service';
import { Jobseeker } from '../find-applicant/find-applicant.service';

@Component({
  selector: 'app-jobseeker-profile-completion',
  templateUrl: './jobseeker-profile-completion.html',
  styleUrls: ['./jobseeker-profile-completion.scss']
})
export class JobseekerProfileCompletionComponent {

  constructor(private formBuilder: FormBuilder,
    private profileService: ProfileCompletionService,
    private route: Router,
    private alertService: AlertService
  ) { }

  private file: File | null = null;
  registerApi: Subscription = new Subscription();

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    phoneno: ['', [Validators.required, Validators.maxLength(10)]],
    dob: "2002/10/12",
    password: ['', Validators.required],
    headline: ['',],
    skills: ['',],
    schoolName: ['',],
    schlPassedOutYear: 2024,
    collegeName: ['',],
    clgPassedOutYear: 2024,
    currentPosition: ['',],
    location: ['',],
    indusrties: [[],],
  });

  upload(event: any): void {
    this.file = event.target.files[0];
  }

  register(): void {

    const formData: FormData = new FormData();
    formData.append('name', this.registerForm.get('name')!.value || "");
    formData.append('email', this.registerForm.get('email')?.value || "");
    formData.append('dob', this.registerForm.get('dob')?.value || "");
    formData.append('headline', this.registerForm.get('headline')?.value || "");
    formData.append('phoneno', this.registerForm.get('phoneno')?.value || "");
    formData.append('skills', this.registerForm.get('skills')?.value || "");
    formData.append('password', this.registerForm.get('password')?.value || "");
    formData.append('schoolName', this.registerForm.get('schoolName')?.value || "");
    formData.append('schlPassedOutYear', this.registerForm.get('schlPassedOutYear')?.value?.toString() || "");
    formData.append('clgPassedOutYear', this.registerForm.get('clgPassedOutYear')?.value?.toString() || "");
    formData.append('collegeName', this.registerForm.get('collegeName')?.value || "");
    formData.append('currentPosition', this.registerForm.get('currentPosition')?.value || "");
    formData.append('location', this.registerForm.get('location')?.value || "");
    formData.append('indusrties', this.registerForm.get('indusrties')?.value || "");
    formData.append('image', this.file || "");

    if (!this.registerForm.invalid) {
      this.registerApi = this.profileService.register(formData).subscribe({
        next: (data: Jobseeker) => {
          this.alertService.alertMessage('Registeration Successful!', `redirected to login`, 'success');
          this.route.navigate(['login']);
        },
      });
    }

  }

  ngOnDestroy() {
    this.registerApi.unsubscribe();
  }

}
