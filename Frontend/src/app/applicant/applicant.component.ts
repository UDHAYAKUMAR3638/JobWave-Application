import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Applicant } from '../my-post/my-post.service';
import { ApplicantService } from './applicant.service';
@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss']
})
export class ApplicantComponent {
  applicantData!: Applicant;
  status!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public details: Applicant, public dialogRef: MatDialogRef<ApplicantComponent>,
    private applicantService: ApplicantService
  ) { }

  ngOnInit() {
    this.applicantData = this.details;
    this.status = this.applicantData.status;
  }

  close(): void {
    this.dialogRef.close();
  }

  accept() {
    this.applicantService.acceptMail(this.applicantData.postId, this.applicantData);
    this.status = this.applicantData.status;
  }

  reject() {
    this.applicantService.rejectMail(this.applicantData.postId, this.applicantData);
    this.status = this.applicantData.status;
  }
}
