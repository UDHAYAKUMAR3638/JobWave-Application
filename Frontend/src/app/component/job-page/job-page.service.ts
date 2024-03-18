import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { JobApplication } from '../job-apply/job-apply.service';
import { List } from 'lodash';
import { Observable } from 'rxjs';
import { Page } from '../../service/data.service';
import { Post } from '../post-page/post-page.service';

@Injectable({
    providedIn: 'root',
})

export class JobPageService {

    constructor(private http: HttpClient) { }

    getAllPosts(role: string, jobType: string, location: string, pageIndex: number, pageSize: number): Observable<{ content: Array<Post>, totalElements: number }> {
        const params = new HttpParams()
            .set('role', role)
            .set('jobType', jobType)
            .set('location', location)
            .set('pageIndex', pageIndex)
            .set('pageSize', pageSize);

        return this.http.get<{ content: Array<Post>, totalElements: number }>(`${environment.postUrl}getPost`, { params });
    }

    getMyJobs(): Observable<JobApplication[]> {
        return this.http.get<JobApplication[]>(`${environment.jobseekerUrl}myJobs/${sessionStorage.getItem('email')}`);
    }
}
