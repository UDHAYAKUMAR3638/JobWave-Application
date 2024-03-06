import { Component } from '@angular/core';
import { Bill, BillsPageService } from './bills-page.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-bills-page',
  templateUrl: './bills-page.component.html',
  styleUrls: ['./bills-page.component.scss']
})
export class BillsPageComponent {

  constructor(private billService: BillsPageService) {
  }

  bills!: Array<Bill>;
  length = 40;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  ngOnInit() {
    this.getBill();
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getBill();
  }

  getBill() {
    this.billService.getBills(this.pageIndex, this.pageSize).subscribe({
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
