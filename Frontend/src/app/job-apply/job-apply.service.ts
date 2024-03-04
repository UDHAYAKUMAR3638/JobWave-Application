import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Jobseeker } from '../find-applicant/find-applicant.service';
import { Post } from '../post-page/post-page.service';
export interface JobApplication {
    name: string,
    email: string,
    phoneno: string,
    skills: string,
    resume: string,
    experience: string,
    postId: Post,
    userId: Jobseeker
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
