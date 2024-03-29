import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { JobApplication } from '../job-apply/job-apply.service';

@Injectable({
    providedIn: 'root',
})

export class MyJobService {

    constructor(private http: HttpClient) { }

    getJobs(email: string, pageIndex: number, pageSize: number): Observable<{ content: JobApplication[]; totalElements: number; }> {
        const params = new HttpParams()
            .set('email', email)
            .set('pageIndex', pageIndex)
            .set('pageSize', pageSize);
        return this.http.get<{ content: JobApplication[]; totalElements: number; }>(`${environment.jobseekerUrl}myJobs`, { params });
    }

    getApplication(postId: string, email: string): Observable<JobApplication> {
        return this.http.get<JobApplication>(`${environment.jobseekerUrl}myJobs/${postId}/${email}`);
    }

}
