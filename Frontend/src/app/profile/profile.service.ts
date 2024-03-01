import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root',
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
      form.append('indusrties', user.indusrties);
      return this.http.put(`${environment.jobseekerUrl}/update`, form);
    }
    else if (sessionStorage.getItem('role') === "RECRUITER") {
      form.append('_id', user._id);
      form.append('companyName', user.companyName);
      form.append('empCount', user.empCount);
      form.append('name', user.name);
      form.append('phoneno', user.phoneno);
      form.append('email', user.email);
      form.append('password', user.password);
      form.append('companyType', user.companyType);
      form.append('location', user.location);
      return this.http.put(`${environment.recruiterUrl}/update`, form);
    }
    else {
      form.append('_id', user._id);
      form.append('name', user.name);
      form.append('email', user.email);
      form.append('password', user.password);
      return this.http.put(`${environment.userUrl}/update`, form)
    }
  }
}
