import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RecruiterProfileCompletionService } from './recruiter-profile-completion.service';

@Component({
  selector: 'app-recruiter-profile-completion',
  templateUrl: './recruiter-profile-completion.component.html',
  styleUrls: ['./recruiter-profile-completion.component.scss']
})

export class RecruiterProfileCompletionComponent {

  constructor(private fb: FormBuilder, private profileService: RecruiterProfileCompletionService, private route: Router) { }
  private file: File | null = null;
  registerForm = this.fb.group({
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

  upload(event: any) {
    this.file = event.target.files[0];
  }

  register() {

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

    if (!this.registerForm.invalid) {
      this.profileService.register(formData).subscribe({
        next: (data) => {
          // console.log(data);
          Swal.fire({
            title: 'Registeration Successful!',
            text: 'redirected to login',
            icon: 'success'
          })
          this.route.navigate(['login']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

}
