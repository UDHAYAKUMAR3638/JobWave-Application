import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RecuriterProfileCompletionComponent } from './recuriter-profile-completion.component';


const appRoute: Routes = [
    {
        path: "", component: RecuriterProfileCompletionComponent
    },
]

@NgModule({
    declarations: [RecuriterProfileCompletionComponent],
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
export class RecuriterProfileCompletionModule { }
