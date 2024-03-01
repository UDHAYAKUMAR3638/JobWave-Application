import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})

export class MyJobService {
    constructor(private http: HttpClient) {
    }

    getJobs(email: string) {
        return this.http.get<any>(environment.jobseekerUrl + `/myJobs/${email}`);
        // return this.http.get<any>(environment.jobseekerUrl + `/getAll`);
    }

    getApplication(postId: string, email: string) {
        return this.http.get<any>(environment.jobseekerUrl + `/myJobs/${postId}/${email}`);
    }

}
