import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfileCompletionService } from '../profile-completion/profile-completion.service';
import { register } from '../register/register.service';
import { RecuriterProfileCompletionService, registerRecuriter } from './recuriter-profile-completion.service';

@Component({
  selector: 'app-recuriter-profile-completion',
  templateUrl: './recuriter-profile-completion.component.html',
  styleUrls: ['./recuriter-profile-completion.component.scss']
})
export class RecuriterProfileCompletionComponent {
  constructor(private fb: FormBuilder, private profileService: RecuriterProfileCompletionService, private route: Router) { }

  registerForm = this.fb.group({
    companyName: ['', Validators.required],
    empCount: [, Validators.required],
    name: ['', Validators.required],
    phoneno: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    companyType: ['', Validators.required],
    location: ['', Validators.required],
    role: ['RECURITER']
  });

  register() {
    if (!this.registerForm.invalid) {
      this.profileService.register(<registerRecuriter>this.registerForm.value).subscribe({
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
