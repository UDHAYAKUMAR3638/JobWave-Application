import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recruiter } from '../recruiter-profile-completion/recruiter-profile-completion.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ViewCompanyService {

  constructor(private http: HttpClient) { }

  getCompany(id: String) {
    return this.http.get<Recruiter>(`${environment.recruiterUrl}/getById/${id}`);
  }

}
