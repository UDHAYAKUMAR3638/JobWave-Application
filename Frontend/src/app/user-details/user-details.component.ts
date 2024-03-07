import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { Jobseeker } from '../jobseeker-profile-completion/jobseeker-profile-completion.service';
import { User } from '../add-user/add-user.service';
import { UserAppliedJobsComponent } from '../user-applied-jobs/user-applied-jobs.component';
import { UserPostedJobsComponent } from '../user-posted-jobs/user-posted-jobs.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public details: any, public dialogRef: MatDialogRef<UserDetailsComponent>,
    private matDialog: MatDialog
  ) { }

  user: any;
  role!: string;

  ngOnInit() {
    this.user = this.details.data;
    this.role = this.details.role;
  }

  getPosts(email: string) {
    this.matDialog.open(UserPostedJobsComponent,
      {
        data: { email },
        height: '600px',
        width: '800px',
      });

  }
  getJobs(email: string) {
    this.matDialog.open(UserAppliedJobsComponent,
      {
        data: { email },
        height: '550px',
        width: '600px',
      });
  }

}
