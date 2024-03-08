import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Post } from '../post-page/post-page.service';
import { Jobseeker } from '../find-applicant/find-applicant.service';
import { JobApplication } from '../job-apply/job-apply.service';
import { List } from 'lodash';
import { Page } from '../service/data.service';


@Injectable({
    providedIn: 'root'
})

export class MyPostService {

    constructor(private http: HttpClient) { }

    MyPosts(id: string, pageIndex: number, pageSize: number): Observable<Page> {
        const params = new HttpParams()
            .set('id', id)
            .set('pageIndex', pageIndex)
            .set('pageSize', pageSize);
        return this.http.get<Page>(environment.recruiterUrl + `/getPosts`, { params });
    }

    MyPostSeekers(id: string): Observable<Array<JobApplication>> {
        return this.http.get<Array<JobApplication>>(environment.recruiterUrl + `/getPostSeekers/${id}`);
    }

    updatePost(post: Post): Observable<Post> {
        return this.http.put<Post>(`${environment.recruiterUrl}/update-post`, post);
    }

    getUserId(email: string): Observable<Post> {
        return this.http.get<Post>(
            `${environment.recruiterUrl}/getEmail/${email}`);
    }

}
