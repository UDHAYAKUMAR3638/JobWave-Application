import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Jobseeker } from '../find-applicant/find-applicant.service';

@Injectable({
    providedIn: 'root'
})

export class ProfileCompletionService {

    constructor(private http: HttpClient) { }

    register(data: FormData): Observable<Jobseeker> {
        // data.forEach((value, key) => {
        //     console.log(key, value);
        // })
        return this.http.post<Jobseeker>(environment.jobseekerUrl + "/register", data);
    }

}
