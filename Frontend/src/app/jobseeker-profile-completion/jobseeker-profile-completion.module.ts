import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { JobseekerProfileCompletionComponent } from './jobseeker-profile-completion.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


const appRoute: Routes = [
    {
        path: "", component: JobseekerProfileCompletionComponent
    },
]

@NgModule({
    declarations: [JobseekerProfileCompletionComponent],
    imports: [
        RouterModule.forChild(appRoute),
        CommonModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ]
})
export class ProfileCompletionModule { }
