import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecuriterComponent } from './recuriter.component';

const appRoute: Routes = [
    {
        path: "", component: RecuriterComponent
    },
]

@NgModule({
    declarations: [RecuriterComponent],
    imports: [
        RouterModule.forChild(appRoute),
        CommonModule
    ]
})
export class RecuriterModule { }
