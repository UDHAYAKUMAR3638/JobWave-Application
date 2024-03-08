import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recruiter, RecruiterProfileCompletionService } from './recruiter-profile-completion.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-recruiter-profile-completion',
  templateUrl: './recruiter-profile-completion.component.html',
  styleUrls: ['./recruiter-profile-completion.component.scss']
})

export class RecruiterProfileCompletionComponent {

  constructor(
    private formBuilder: FormBuilder,
    private profileService: RecruiterProfileCompletionService,
    private route: Router,
    private alertService: AlertService
  ) { }

  private file: File | null = null;
  registerApi: Subscription = new Subscription();

  registerForm = this.formBuilder.group({
    _id: '',
    companyName: ['', Validators.required],
    empCount: ['', Validators.required],
    name: ['', Validators.required],
    phoneno: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    companyType: ['', Validators.required],
    location: ['', Validators.required],
    image: this.file,
    about: ''
  });

  upload(event: any): void {
    this.file = event.target.files[0];
  }

  register(): void {

    if (!this.registerForm.invalid) {
      const formData: FormData = new FormData();
      formData.append('_id', this.registerForm.get('_id')!.value || "");
      formData.append('companyName', this.registerForm.get('companyName')?.value || "");
      formData.append('empCount', this.registerForm.get('empCount')?.value || "");
      formData.append('name', this.registerForm.get('name')?.value || "");
      formData.append('phoneno', this.registerForm.get('phoneno')?.value || "");
      formData.append('email', this.registerForm.get('email')?.value || "");
      formData.append('password', this.registerForm.get('password')?.value || "");
      formData.append('companyType', this.registerForm.get('companyType')?.value || "");
      formData.append('location', this.registerForm.get('location')?.value || "");
      formData.append('image', this.file || "");
      formData.append('about', this.registerForm.get('about')?.value || "");

      this.registerApi = this.profileService.register(formData).subscribe({
        next: (data: Recruiter) => {
          this.alertService.alertMessage('Registeration Successful', 'redirected to login', 'success')
          this.route.navigate(['login']);
        },

      });
    }

  }

  ngOnDestroy(): void {
    this.registerApi.unsubscribe();
  }

}
