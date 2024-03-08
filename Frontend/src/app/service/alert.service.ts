import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon } from "sweetalert2";

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor() { }

    alertMessage(title: string, text: string, icon: SweetAlertIcon): void {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
        });
    }
}
