import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

export interface Industry {
    industryName: string,
    role: string,
    duration: string
}
export interface Jobseeker {
    _id: string,
    email: string,
    name: string,
    phoneno: string,
    dob: Date,
    headline: string,
    schoolName: string,
    schlPassedOutYear: number,
    collegeName: string,
    clgPassedOutYear: number,
    currentPosition: string,
    skills: string,
    industries: Array<Industry>,
    location: string,
    image: string
}

@Injectable({
    providedIn: 'root'
})
export class FindApplicantService {
    constructor(private http: HttpClient) {
    }

    getAllSeekers(): Observable<any> {
        return this.http.get<Array<Jobseeker>>(environment.jobseekerUrl + `/getAll`);
    }

}
