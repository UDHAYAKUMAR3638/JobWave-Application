import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { JobseekerShowDirective } from '../custom-directives/jobseeker-show.directive';
import { RecruiterShowDirective } from '../custom-directives/recruiter-show.directive';
import { AdminHideDirective } from '../custom-directives/admin-hide.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


const appRoute: Routes = [
    {
        path: "", component: ProfileComponent
    },
]

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(appRoute),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        JobseekerShowDirective,
        RecruiterShowDirective,
        AdminHideDirective,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [RouterModule]
})
export class ProfileModule { }
