import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})

export class JobPageService {

    constructor(private http: HttpClient) {
    }

    getAllPosts(role: string, jobType: string, location: string, pageIndex: number, pageSize: number) {
        const params = new HttpParams()
            .set('role', role)
            .set('jobType', jobType)
            .set('location', location)
            .set('pageIndex', pageIndex)
            .set('pageSize', pageSize);

        return this.http.get<any>(`${environment.postUrl}/getPost`, { params });
    }

    getApplication(postId: string, email: string) {
        return this.http.get<any>(`${environment.jobseekerUrl}/myJobs/${postId}/${email}`);
    }

    getMyJobs() {
        return this.http.get<any>(`${environment.jobseekerUrl}/myJobs/${sessionStorage.getItem('email')}`);
    }
}
