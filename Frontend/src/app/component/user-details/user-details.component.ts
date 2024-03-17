import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserAppliedJobsComponent } from '../user-applied-jobs/user-applied-jobs.component';
import { UserPostedJobsComponent } from '../user-posted-jobs/user-posted-jobs.component';
import { User } from '../profile/profile.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public details: { data: User, role: string },
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    private matDialog: MatDialog
  ) { }

  user!: User;
  role!: string;

  ngOnInit(): void {
    this.user = this.details.data;
    this.role = this.details.role;
  }

  getPosts(email: string): void {

    this.matDialog.open(UserPostedJobsComponent,
      {
        data: { email },
        height: '600px',
        width: '800px',
      });

  }

  getJobs(email: string): void {

    this.matDialog.open(UserAppliedJobsComponent,
      {
        data: { email },
        height: '600px',
        width: '800px',
      });
  }

  close(): void {
    this.dialogRef.close();
  }

}
