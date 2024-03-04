import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Post } from '../post-page/post-page.service';
import { Applicant } from '../my-post/my-post.service';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class ApplicantService {

    constructor(private http: HttpClient) {
    }

    acceptMail(postDetails: Post, user: Applicant) {
        const body = { toEmail: user.email, subject: `${postDetails.role} application response`, body: `Mr.${user.name},\nyour application is selected for role ${postDetails.role} in ${postDetails.recruiterId.companyName},${postDetails.location}\nFurther process will be intimated by company recruitment team.\n                                                Thanks you` };
        user.status = "Accepted";
        this.updateApplication(user).subscribe({
            next: () => {
                this.http.post(environment.emailUrl, body).subscribe({
                    next: () => {
                        Swal.fire({
                            title: 'Mail sent successfully',
                            icon: 'success'
                        })
                    }
                })
            }
        });
    }

    rejectMail(postDetails: Post, user: Applicant) {
        const body = { toEmail: user.email, subject: `${postDetails.role} application response`, body: `Mr.${user.name},\nyour application is rejected for role ${postDetails.role} in ${postDetails.recruiterId.companyName},${postDetails.location}.\nKeep applying for jobs in our website.\nHope find your suitable job soon.\n                                            Thank you` };
        user.status = "Rejected";
        this.updateApplication(user).subscribe({
            next: () => {
                this.http.post(environment.emailUrl, body).subscribe({
                    next: () => {
                        Swal.fire({
                            title: 'Mail sent successfully',
                            icon: 'success'
                        })
                    }
                })
            }
        });
    }

    updateApplication(user: Applicant) {
        return this.http.put(`${environment.jobseekerUrl}/update-application`, user);
    }

}
