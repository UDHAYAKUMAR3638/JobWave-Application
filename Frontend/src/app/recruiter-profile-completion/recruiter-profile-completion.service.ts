import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
export interface registerRecruiter {
    name: string,
    companyName: string,
    empCount: number,
    companyType: string,
    email: string,
    phoneno: string,
    password: string,
    location: string,
    image: File,

}
@Injectable({
    providedIn: 'root'
})
export class RecruiterProfileCompletionService {
    constructor(private http: HttpClient) {
    }

    register(data: any): Observable<any> {
        return this.http.post<any>(environment.recruiterUrl + "/register", data);
    }

}
