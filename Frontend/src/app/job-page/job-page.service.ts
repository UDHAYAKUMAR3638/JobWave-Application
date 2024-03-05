import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})

export class JobPageService {
    constructor(private http: HttpClient) {
        this.getAllPosts();
    }

    getAllPosts() {
        return this.http.get<any>(`${environment.recruiterUrl}/getAllPost`);
    }

    getApplication(postId: string, email: string) {
        return this.http.get<any>(`${environment.jobseekerUrl}/myJobs/${postId}/${email}`);
    }

    getMyJobs() {
        return this.http.get<any>(`${environment.jobseekerUrl}/myJobs/${sessionStorage.getItem('email')}`);
    }
}
