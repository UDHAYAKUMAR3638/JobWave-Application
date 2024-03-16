import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicantService } from './applicant.service';
import { AlertService } from '../../service/alert.service';
import { Subscription } from 'rxjs';
import { JobApplication } from '../job-apply/job-apply.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss']
})
export class ApplicantComponent {

  applicantData!: JobApplication;
  status!: string;
  updateApi: Subscription = new Subscription();
  emailApi: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public details: JobApplication, public dialogRef: MatDialogRef<ApplicantComponent>,
    private applicantService: ApplicantService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.applicantData = this.details;
    this.status = this.applicantData.status;
  }

  close(): void {
    this.dialogRef.close();
  }

  accept(): void {
    this.applicantData.status = "Accepted";
    this.updateApi = this.applicantService.updateApplication(this.applicantData).subscribe({
      next: () => {
        this.sendEmail(true);
      }
    });

  }

  reject(): void {
    this.applicantData.status = "Rejected";
    this.updateApi = this.applicantService.updateApplication(this.applicantData).subscribe({
      next: () => {
        this.sendEmail(false);
      }
    });

  }

  sendEmail(val: boolean): void {
    this.emailApi = this.applicantService.sendMail(this.applicantData.postId, this.applicantData, val).subscribe({
      next: () => {
      }
    });
    this.alertService.alertMessage('Mail sent successfully', '', 'success');
    this.status = this.applicantData.status;
  }

  ngOnDestroy() {
    this.updateApi.unsubscribe();
    this.emailApi.unsubscribe();
  }

}
