import { Component, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MyJobService } from '../my-job/my-job.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobApplication } from '../job-apply/job-apply.service';

@Component({
  selector: 'app-user-applied-jobs',
  templateUrl: './user-applied-jobs.component.html',
  styleUrls: ['./user-applied-jobs.component.scss']
})
export class UserAppliedJobsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public details: any, public dialogRef: MatDialogRef<UserAppliedJobsComponent>,
    private myJobService: MyJobService,
  ) { }

  jobs: Array<JobApplication> = [];
  length = 40;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  displayedColumns: string[] = ['Job title', 'Company name', 'Name', 'Email', 'Resume', 'Status'];

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.myJobService.getJobs(this.details.email, this.pageIndex, this.pageSize).subscribe({
      next: (data: { content: JobApplication[]; totalElements: number; }) => {
        this.jobs = data.content;
        this.length = data.totalElements;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getUser();
  }


}
