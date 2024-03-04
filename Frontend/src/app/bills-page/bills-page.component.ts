import { Component } from '@angular/core';
import { Bill, BillsPageService } from './bills-page.service';

@Component({
  selector: 'app-bills-page',
  templateUrl: './bills-page.component.html',
  styleUrls: ['./bills-page.component.scss']
})
export class BillsPageComponent {

  constructor(private billService: BillsPageService) {
  }

  bills!: Array<Bill>;

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
