import { RouterModule, Routes } from "@angular/router";
import { RegistrationComponent } from "./registration.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const appRoute: Routes = [
    {
        path: "", component: RegistrationComponent
    },
]

@NgModule({
    declarations: [RegistrationComponent],
    imports: [
        RouterModule.forChild(appRoute),
        CommonModule,
    ]
})
export class RegistrationModule { }