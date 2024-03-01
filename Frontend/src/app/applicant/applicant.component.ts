import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { applicant } from '../my-post/my-post.service';
import { ApplicantService } from './applicant.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss']
})
export class ApplicantComponent {
  applicantData!: applicant;

  constructor(
    @Inject(MAT_DIALOG_DATA) public details: applicant, public dialogRef: MatDialogRef<ApplicantComponent>,
    private applicantService: ApplicantService
  ) { }

  ngOnInit() {
    this.applicantData = this.details;
  }

  close(): void {
    this.dialogRef.close();
  }

  accept() {
    this.applicantService.acceptMail(this.applicantData.postId, this.applicantData);
  }

  reject() {
    this.applicantService.rejectMail(this.applicantData.postId, this.applicantData);
  }
}
