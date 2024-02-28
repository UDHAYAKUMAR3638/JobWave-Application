import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
export interface post {
    _id: string,
    role: string,
    location: string,
    salary: string,
    jobType: string,
    skills: string,
    schedule: string,
    content: string,
    education: string,
    benifits: string,
    language: any,
    date: Date,
    companyName: string,
    recruiterId: { _id: string }
}
@Injectable({
    providedIn: 'root'
})
export class PostPageService {
    constructor(private http: HttpClient) {
    }

    post(data: any): Observable<any> {
        console.log(data);

        return this.http.post<any>(environment.recruiterUrl + "/post", data);
    }

}
