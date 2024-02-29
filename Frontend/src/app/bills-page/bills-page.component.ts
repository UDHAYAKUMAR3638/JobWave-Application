import { Component } from '@angular/core';
import { BillsPageService, bill } from './bills-page.service';

@Component({
  selector: 'app-bills-page',
  templateUrl: './bills-page.component.html',
  styleUrls: ['./bills-page.component.scss']
})
export class BillsPageComponent {

  constructor(private billService: BillsPageService) {
  }

  bills!: Array<bill>;

  ngOnInit() {
    this.billService.getBills().subscribe({
      next: (bill: any) => {
        this.bills = bill;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
