import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
export interface registerRecruiter {
    name: string,
    email: string,
    phoneno: string,
    dob: string,
    password: string,
    headline: string,
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
export class RecruiterProfileCompletionService {
    constructor(private http: HttpClient) {
    }

    register(data: registerRecruiter): Observable<any> {
        return this.http.post<any>(environment.recruiterUrl + "/register", data);
    }

}
