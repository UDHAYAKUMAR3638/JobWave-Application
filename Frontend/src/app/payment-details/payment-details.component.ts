import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Bill, BillsPageService } from '../bills-page/bills-page.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss'],
})
export class PaymentDetailsComponent {

  bills!: Array<Bill>;

  constructor(
    private billService: BillsPageService
  ) { }

  users: any = '';
  length = 40;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  displayedColumns: string[] = ['Post Title', 'Name', 'Email', 'Payment ID', 'Order ID', 'Amount', 'Payment Date'];

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getBill();
  }

  ngOnInit(): void {
    this.getBill();
  }

  getBill() {
    this.billService.getAllBills(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.bills = data.content;
        this.length = data.totalElements;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
