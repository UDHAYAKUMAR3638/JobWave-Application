import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { Jobseeker } from '../profile-completion/profile-completion.service';
import { User } from '../add-user/add-user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public details: any, public dialogRef: MatDialogRef<UserDetailsComponent>,
  ) { }

  user: any;
  role!: string;

  ngOnInit() {
    this.user = this.details.data;
    this.role = this.details.role;
  }

}
