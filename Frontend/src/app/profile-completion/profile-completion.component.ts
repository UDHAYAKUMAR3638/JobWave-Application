import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileCompletionService, registerCandidate } from './profile-completion.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-completion',
  templateUrl: './profile-completion.component.html',
  styleUrls: ['./profile-completion.component.scss']
})
export class ProfileCompletionComponent {
  constructor(private fb: FormBuilder, private profileService: ProfileCompletionService, private route: Router) { }

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    phoneno: ['', [Validators.required, Validators.maxLength(10)]],
    dob: "2002/10/12",
    password: ['', Validators.required],
    headline: ['',],
    schoolName: ['',],
    schlPassedOutYear: 2024,
    collegeName: ['',],
    clgPassedOutYear: 2024,
    currentPosition: ['',],
    location: ['',],
    indusrties: [[],],
    role: ['CADNDIATE']
  });

  register() {
    if (!this.registerForm.invalid) {
      this.profileService.register(<registerCandidate>this.registerForm.value).subscribe({
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
