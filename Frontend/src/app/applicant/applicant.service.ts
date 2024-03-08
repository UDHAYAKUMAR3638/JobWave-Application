import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Post } from '../post-page/post-page.service';
import { JobApplication } from '../job-apply/job-apply.service';

@Injectable({
    providedIn: 'root'
})

export class ApplicantService {

    constructor(
        private http: HttpClient,
    ) { }

    updateApplication(user: JobApplication): Observable<JobApplication> {
        return this.http.put<JobApplication>(`${environment.jobseekerUrl}/update-application`, user);
    }

    sendMail(postDetails: Post, user: JobApplication, val: boolean): Observable<Boolean> {
        const body = {
            toEmail: user.email,
            subject: `${postDetails.role} application response`,
            body: val ? `Mr.${user.name},\nyour application is selected for role ${postDetails.role} in ${postDetails.recruiterId.companyName},${postDetails.location}\nFurther process will be intimated by company recruitment team.\nThanks you`
                : `Mr.${user.name},\nyour application is rejected for role ${postDetails.role} in ${postDetails.recruiterId.companyName},${postDetails.location}.\nKeep applying for jobs in our website.\nHope find your suitable job soon.\nThank you`
        };
        return this.http.post<Boolean>(environment.emailUrl, body);
    }

}
