import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  profile: string = '';
  name: string = '';
  loginApi: Subscription = new Subscription();

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    if (this.loginService.isAuthencticate()) {
      this.loginApi = this.loginService.getUser().subscribe({
        next: (data: { image: string; name: string; }) => {
          this.profile = data.image;
          this.name = data.name;
        }
      });
    }

  }

  login() {
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.loginApi.unsubscribe();
  }

}
