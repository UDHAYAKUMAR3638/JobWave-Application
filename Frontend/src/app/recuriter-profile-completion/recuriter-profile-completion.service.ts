import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
export interface registerRecuriter {
    name: string,
    email: string,
    phoneno: string,
    dob: string,
    password: string,
    headline: string,
    schoolName: string,
    schlPassedOutYear: number,
    collegeName: string,
    clgPassedOutYear: number,
    currentPosition: string,
    location: string,
    role: string
}
@Injectable({
    providedIn: 'root'
})
export class RecuriterProfileCompletionService {
    constructor(private http: HttpClient) {
    }

    register(data: registerRecuriter): Observable<any> {
        return this.http.post<any>(environment.recuriterUrl + "/register", data);
    }

}
