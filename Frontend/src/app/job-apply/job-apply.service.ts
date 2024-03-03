import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { jobseeker } from '../find-applicant/find-applicant.service';
import { post } from '../post-page/post-page.service';
export interface jobApplication {
    name: string,
    email: string,
    phoneno: string,
    skills: string,
    resume: string,
    experience: string,
    postId: post,
    userId: jobseeker
    status: string
}
@Injectable({
    providedIn: 'root'
})

export class JobApplyService {

    constructor(private http: HttpClient) {
    }

    apply(data: FormData): Observable<any> {
        return this.http.post<any>(environment.jobseekerUrl + "/apply", data);
    }


}
