import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

export interface user {
  _id: string,
  name: string,
  email: string,
  password: string,
  companyName: string,
  companyType: string,
  empCount: number,
  phoneno: string,
  dob: string,
  headline: string,
  schoolName: string,
  schlPassedOutYear: string,
  collegeName: string,
  clgPassedOutYear: number,
  currentPosition: number,
  skills: string,
  location: string,
  industries: [],
  image: File
}

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  constructor(private http: HttpClient) { }

  update(user: any, form: FormData) {
    if (sessionStorage.getItem('role') === "JOBSEEKER") {
      form.append('_id', user._id);
      form.append('name', user.name);
      form.append('email', user.email);
      form.append('dob', user.dob);
      form.append('headline', user.headline);
      form.append('phoneno', user.phoneno);
      form.append('skills', user.skills);
      form.append('password', user.password);
      form.append('schoolName', user.schoolName);
      form.append('schlPassedOutYear', user.schlPassedOutYear);
      form.append('clgPassedOutYear', user.clgPassedOutYear);
      form.append('collegeName', user.collegeName);
      form.append('currentPosition', user.currentPosition);
      form.append('location', user.location);

      return this.http.put(`${environment.jobseekerUrl}/update`, form).subscribe({
        next: () => {
          this.http.put(`${environment.jobseekerUrl}/update-industry/${user._id}`, user.jobseekerIndustries).subscribe(() => {
          })
        }
      });
    }
    else if (sessionStorage.getItem('role') === "RECRUITER") {
      form.append('id', user.value._id);
      form.append('companyName', user.value.companyName);
      form.append('empCount', user.value.empCount);
      form.append('name', user.value.name);
      form.append('phoneno', user.value.phoneno);
      form.append('email', user.value.email);
      form.append('password', user.value.password);
      form.append('companyType', user.value.companyType);
      form.append('location', user.value.location);
      return this.http.put(`${environment.recruiterUrl}/update`, form);
    }
    else {
      form.append('_id', user.value._id);
      form.append('name', user.value.name);
      form.append('email', user.value.email);
      form.append('password', user.value.password);
      return this.http.put(`${environment.userUrl}/update`, form);
    }
  }
}
