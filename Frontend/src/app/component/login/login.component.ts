import { Component } from '@angular/core';
import { LoginService, Login, UserDetails } from './login.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../../service/alert.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]

  });

  loginApi: Subscription = new Subscription();

  login(): void {

    if (!this.loginForm.invalid) {
      this.loginApi = this.loginService.authenticate(<Login>this.loginForm.value).subscribe({
        next: (token: UserDetails) => {
          sessionStorage.setItem('isLogged', 'true');
          sessionStorage.setItem('token', token.token);
          sessionStorage.setItem('email', token.user.email);
          sessionStorage.setItem('role', token.user.role.role);
        },
        error: (error) => {
          this.alertService.alertMessage('Enter Valid User Details!', 'Try again', 'error');
        },
        complete: () => {
          this.alertService.alertMessage('Login Success', 'redirected to home', 'success');

          if (this.loginService.isAuthencticate()) {
            this.homePage();
          }

        }
      });

    }

  }

  registerPage(): void {
    this.router.navigate(['typeLogin']);
  }

  loginPage(): void {
    this.router.navigate(['login']);
  }

  homePage(): void {
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.loginApi.unsubscribe();
  }

}
