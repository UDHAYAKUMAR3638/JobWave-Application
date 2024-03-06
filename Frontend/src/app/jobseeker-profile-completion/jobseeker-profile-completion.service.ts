import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
export interface Jobseeker {
    name: string,
    email: string,
    phoneno: string,
    dob: string,
    password: string,
    headline: string,
    skills: string,
    schoolName: string,
    schlPassedOutYear: number,
    collegeName: string,
    clgPassedOutYear: number,
    currentPosition: string,
    location: string,
    role: string
}
@Injectable({
    providedIn: 'root'
})
export class ProfileCompletionService {
    constructor(private http: HttpClient) {
    }

    register(data: FormData): Observable<any> {
        // data.forEach((value, key) => {
        //     console.log(key, value);
        // })
        return this.http.post<any>(environment.jobseekerUrl + "/register", data);
    }

}
