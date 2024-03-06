import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Post } from '../post-page/post-page.service';
import { Jobseeker } from '../find-applicant/find-applicant.service';
import { JobApplication } from '../job-apply/job-apply.service';
import { List } from 'lodash';


export interface Applicant {
    _id: string,
    email: string,
    name: string,
    phoneno: string,
    resume: string,
    skills: string,
    experience: string,
    postId: Post,
    userId: Jobseeker
    status: string;
}

@Injectable({
    providedIn: 'root'
})
export class MyPostService {
    constructor(private http: HttpClient) {
    }

    MyPosts(id: string, pageIndex: number, pageSize: number): Observable<any> {
        const params = new HttpParams()
            .set('id', id)
            .set('pageIndex', pageIndex)
            .set('pageSize', pageSize);
        return this.http.get<Array<Post>>(environment.recruiterUrl + `/getPosts`, { params });
    }

    MyPostSeekers(id: string): Observable<any> {
        return this.http.get<List<JobApplication>>(environment.recruiterUrl + `/getPostSeekers/${id}`);
    }

    updatePost(post: Post): Observable<any> {
        return this.http.put<any>(`${environment.recruiterUrl}/update-post`, post);
    }

}
