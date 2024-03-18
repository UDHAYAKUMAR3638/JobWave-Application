import { Component } from '@angular/core';
import { Bill, BillsPageService } from './bills-page.service';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bills-page',
  templateUrl: './bills-page.component.html',
  styleUrls: ['./bills-page.component.scss']
})
export class BillsPageComponent {

  bills!: Array<Bill>;
  billAPi: Subscription = new Subscription();

  constructor(
    private billService: BillsPageService
  ) { }

  length = 40;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
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
    this.billAPi = this.billService.getBills(this.pageIndex, this.pageSize).subscribe({
      next: (data: { content: Bill[], totalElements: number }) => {
        this.bills = data.content;
        this.length = data.totalElements;
      },

    })
  }

  ngOnDestroy() {
    this.billAPi.unsubscribe();
  }
}
