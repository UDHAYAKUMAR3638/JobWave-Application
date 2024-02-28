import { Component } from '@angular/core';
import { LoginService, login } from './login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {

  loginForm = this.fb.group({
    email: ['admin3@gmail.com', [Validators.email, Validators.required]],
    password: ['admin', Validators.required]

  });
  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  onSubmit() {
    // console.log(this.loginForm.value);
  }
  login(): void {
    if (!this.loginForm.invalid) {
      this.loginService.authenticate(<login>this.loginForm.value).subscribe({
        next: (token) => {
          if (token.status == 200) {
            sessionStorage.setItem('isLogged', 'true');
            sessionStorage.setItem('token', token.body.token);
            sessionStorage.setItem('email', token.body.user.email);
            sessionStorage.setItem('role', token.body.user.role);
          }
          this.loginService.getUser().subscribe({
            next: (data) => {
              sessionStorage.setItem('user', JSON.stringify(data));
            },
            error: (error) => {
              console.log(error);
            }
          })
        },
        error: (error) => {
          console.log('error:', error);
          Swal.fire({
            title: 'Enter Valid User Details!',
            text: 'Try again',
            icon: 'error',
          });
        },
        complete: () => {
          Swal.fire({
            title: 'Login Success',
            text: 'redirected to dashboard',
            icon: 'success',
          });
          if (this.loginService.isAuthencticate()) {
            this.router.navigate(['home']);
          }
        },
      });
    }
  }
  registerPage() {
    this.router.navigate(['typeLogin']);
  }
  loginPage() {
    this.router.navigate(['login']);
  }
  homePage() {
    this.router.navigate(['home']);
  }

}
