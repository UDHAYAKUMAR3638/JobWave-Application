import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileCompletionService, Jobseeker } from './profile-completion.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-completion',
  templateUrl: './profile-completion.component.html',
  styleUrls: ['./profile-completion.component.scss']
})
export class ProfileCompletionComponent {
  constructor(private fb: FormBuilder, private profileService: ProfileCompletionService, private route: Router) { }
  private file: File | null = null;

  registerForm = this.fb.group({
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


  upload(event: any) {
    this.file = event.target.files[0];
  }

  register() {

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
