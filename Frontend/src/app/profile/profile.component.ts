import { Component, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../login/login.service';
interface data {
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  specialization: string,
  inTime: string,
  outTime: string,
  phoneno: string,
  doctor: boolean,
  flag: boolean,
  role: string
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  file: File | string = "";

  image(event: any) {
    this.file = event.target.files[0];
  }
  constructor(private profileService: ProfileService, private router: Router, private loginService: LoginService
    // @Inject(MAT_DIALOG_DATA) public details: data,
    // public dialogRef: MatDialogRef<ProfileComponent>
  ) { }
  userDetails: any;

  ngOnInit() {
    this.loginService.getUser().subscribe({
      next: (details) => {
        this.userDetails = details;
      },
      error: (error) => {
        console.log(error);

      }
    });

  }

  update() {

    const formData: FormData = new FormData();
    formData.append('image', this.file === "" ? new Blob([]) : this.file);
    this.profileService.update(this.userDetails, formData)
      .subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Profile Updated',
            text: 'Successfully',
            icon: 'success',
          });
        },
        error: (error) => {
          console.log(error);
          Swal.fire({
            title: 'Profile Updation',
            text: 'Failed',
            icon: 'error',
          });
        },
      });
  }
  logout() {
    // this.dialogRef.close();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  // close(): void {
  //   this.dialogRef.close();
  // }


}
