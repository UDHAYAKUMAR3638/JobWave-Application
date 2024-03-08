import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Bill, BillsPageService } from '../bills-page/bills-page.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss'],
})
export class PaymentDetailsComponent {

  constructor(
    private billService: BillsPageService
  ) { }

  users: any = '';
  length = 40;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  bills!: Array<Bill>;
  billApi: Subscription = new Subscription();
  displayedColumns: string[] = ['Post Title', 'Name', 'Email', 'Payment ID', 'Order ID', 'Amount', 'Payment Date'];

  handlePageEvent(event: PageEvent): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getBill();
  }

  ngOnInit(): void {
    this.getBill();
  }

  getBill(): void {

    this.billApi = this.billService.getAllBills(this.pageIndex, this.pageSize).subscribe({
      next: (data: { content: Bill[]; totalElements: number; }) => {
        this.bills = data.content;
        this.length = data.totalElements;
      },

    })

  }

  ngOnDestroy(): void {
    this.billApi.unsubscribe();
  }

}
