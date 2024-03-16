import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RecruiterProfileCompletionComponent } from './recruiter-profile-completion.component';


const appRoute: Routes = [
    {
        path: "", component: RecruiterProfileCompletionComponent
    },
]

@NgModule({
    declarations: [RecruiterProfileCompletionComponent],
    imports: [
        RouterModule.forChild(appRoute),
        CommonModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
    ]
})
export class RecruiterProfileCompletionModule {

}
