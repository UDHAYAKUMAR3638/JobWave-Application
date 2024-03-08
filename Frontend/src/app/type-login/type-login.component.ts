import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-login',
  templateUrl: './type-login.component.html',
  styleUrls: ['./type-login.component.scss']
})
export class TypeLoginComponent {

  constructor(private route: Router) { }

  registerSeeker(): void {
    this.route.navigate(['jobseekerRegister']);
  }

  registerRecruiter(): void {
    this.route.navigate(['recruiterRegister']);
  }

}
