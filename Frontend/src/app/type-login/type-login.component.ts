import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-login',
  templateUrl: './type-login.component.html',
  styleUrls: ['./type-login.component.scss']
})
export class TypeLoginComponent {
  constructor(private route: Router) { }
  registerSeeker() {
    this.route.navigate(['jobseekerRegister']);
  }
  registerRecuriter() {
    this.route.navigate(['recuriterRegister']);
  }

}
