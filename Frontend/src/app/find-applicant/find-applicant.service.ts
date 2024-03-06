import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { head } from 'lodash';

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

    getAllSeekers(headline: string, skills: string, location: string, pageIndex: number, pageSize: number): Observable<any> {
        const params = new HttpParams()
            .set('headline', headline)
            .set('skills', skills)
            .set('location', location)
            .set('pageIndex', pageIndex)
            .set('pageSize', pageSize);
        return this.http.get<Array<Jobseeker>>(environment.jobseekerUrl + `/getAll`, { params });
    }

}
