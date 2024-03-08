import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
export interface Recruiter {
    _id: string,
    name: string,
    companyName: string,
    empCount: number,
    companyType: string,
    email: string,
    phoneno: string,
    password: string,
    location: string,
    image: string,
    about: string,
    rating: number
}
@Injectable({
    providedIn: 'root'
})

export class RecruiterProfileCompletionService {

    constructor(private http: HttpClient) { }

    register(data: FormData): Observable<Recruiter> {
        // data.forEach((value, key) => {
        //     console.log(key, value);
        // })
        return this.http.post<Recruiter>(environment.recruiterUrl + "/register", data);
    }

}
