import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})

export class MyJobService {
    constructor(private http: HttpClient) {
    }

    getJobs(email: string, pageIndex: number, pageSize: number) {
        const params = new HttpParams()
            .set('email', email)
            .set('pageIndex', pageIndex)
            .set('pageSize', pageSize);
        return this.http.get<any>(environment.jobseekerUrl + `/myJobs`, { params });
    }

    getApplication(postId: string, email: string) {
        return this.http.get<any>(environment.jobseekerUrl + `/myJobs/${postId}/${email}`);
    }

}
