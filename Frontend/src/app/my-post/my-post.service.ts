import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { post } from '../post-page/post-page.service';
import { jobseeker } from '../find-applicant/find-applicant.service';
import { jobApplication } from '../job-apply/job-apply.service';
import { List } from 'lodash';


export interface applicant {
    _id: string,
    email: string,
    name: string,
    phoneno: string,
    resume: string,
    skills: string,
    experience: string,
    postId: post,
    userId: jobseeker
    status: string;
}

@Injectable({
    providedIn: 'root'
})
export class MyPostService {
    constructor(private http: HttpClient) {
    }

    MyPosts(id: string): Observable<any> {
        return this.http.get<Array<post>>(environment.recruiterUrl + `/getPosts/${id}`);
    }

    MyPostSeekers(id: string): Observable<any> {
        return this.http.get<List<jobApplication>>(environment.recruiterUrl + `/getPostSeekers/${id}`);
    }

    updatePost(post: post): Observable<any> {
        return this.http.put<any>(`${environment.recruiterUrl}/update-post`, post);
    }

}
