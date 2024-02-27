import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RecruiterProfileCompletionService, registerRecruiter } from './recruiter-profile-completion.service';

@Component({
  selector: 'app-recruiter-profile-completion',
  templateUrl: './recruiter-profile-completion.component.html',
  styleUrls: ['./recruiter-profile-completion.component.scss']
})
export class RecruiterProfileCompletionComponent {
  constructor(private fb: FormBuilder, private profileService: RecruiterProfileCompletionService, private route: Router) { }

  registerForm = this.fb.group({
    companyName: ['', Validators.required],
    empCount: [, Validators.required],
    name: ['', Validators.required],
    phoneno: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    companyType: ['', Validators.required],
    location: ['', Validators.required],
  });

  register() {
    if (!this.registerForm.invalid) {
      this.profileService.register(<registerRecruiter>this.registerForm.value).subscribe({
        next: (data) => {
          console.log(data);
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