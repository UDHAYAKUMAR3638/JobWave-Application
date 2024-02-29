import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
export interface jobApplication {
    name: string,
    email: string,
    phoneno: string,
    skills: string,
    resume: string,
    experience: string,
    postId: { _id: "" }
}
@Injectable({
    providedIn: 'root'
})
export class JobApplyService {
    constructor(private http: HttpClient) {
    }

    apply(data: jobApplication): Observable<any> {
        return this.http.post<any>(environment.jobseekerUrl + "/apply", data);
    }


}
