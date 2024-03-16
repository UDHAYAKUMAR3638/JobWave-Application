import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";

@Injectable({
    providedIn: 'root',
})
export class RegistrationService {
    constructor(
        private http: HttpClient
    ) { }

    getRegistrationsByMonth(year: number): Observable<any> {
        return this.http.get(`${environment.userUrl}get-by-month/${year}`);
    }
}