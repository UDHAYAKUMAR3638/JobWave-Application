import { Component } from '@angular/core';
import { LoginService, Login } from './login.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../../service/alert.service';

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

  onSubmit() {
    // console.log(this.loginForm.value);
  }

  loginForm = this.formBuilder.group({
    email: ['admin@gmail.com', [Validators.email, Validators.required]],
    password: ['admin', Validators.required]

  });

  loginApi: Subscription = new Subscription();

  login(): void {

    if (!this.loginForm.invalid) {
      this.loginApi = this.loginService.authenticate(<Login>this.loginForm.value).subscribe({
        next: (token: { status: number; body: { token: string; user: { email: string; role: { role: string; }; }; }; }) => {

          if (token.status == 200) {
            sessionStorage.setItem('isLogged', 'true');
            sessionStorage.setItem('token', token.body.token);
            sessionStorage.setItem('email', token.body.user.email);
            sessionStorage.setItem('role', token.body.user.role.role);
          }

        },
        error: (error: any) => {
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
