import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { post } from '../post-page/post-page.service';
import { jobseeker } from '../find-applicant/find-applicant.service';


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
        return this.http.get<any>(environment.recruiterUrl + `/getPostSeekers/${id}`);
    }

}
