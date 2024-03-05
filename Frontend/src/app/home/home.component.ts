import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  profile: string = '';
  name: string = '';
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getUser().subscribe({
      next: (data) => {
        this.profile = data.image;
        this.name = data.name;
      }
    })
  }

  login() {
    this.router.navigate(['login']);
  }

}
