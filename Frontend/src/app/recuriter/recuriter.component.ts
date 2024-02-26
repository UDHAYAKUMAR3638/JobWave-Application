import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuriter',
  templateUrl: './recuriter.component.html',
  styleUrls: ['./recuriter.component.scss']
})
export class RecuriterComponent {
  constructor(private router: Router) { }

  post() {
    this.router.navigate(['recuriter']);
  }
}
