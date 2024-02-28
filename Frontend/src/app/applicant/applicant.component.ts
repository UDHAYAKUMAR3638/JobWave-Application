import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { applicant } from '../my-post/my-post.service';
@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss']
})
export class ApplicantComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public details: applicant, public dialogRef: MatDialogRef<ApplicantComponent>
  ) { }

  applicantData: applicant = this.details;
  close(): void {
    this.dialogRef.close();
  }
}
