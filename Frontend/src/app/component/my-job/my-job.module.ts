import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { datePipe } from "../../pipe/date.pipe";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MyJobComponent } from './my-job.component';
import { MatPaginatorModule } from '@angular/material/paginator';

const appRoute: Routes = [
    {
        path: "", component: MyJobComponent
    },
]

@NgModule({
    declarations: [MyJobComponent],
    imports: [
        RouterModule.forChild(appRoute),
        MatCardModule,
        CommonModule,
        datePipe,
        FormsModule,
        MatButtonModule,
        MatPaginatorModule
    ]
})
export class MyJobModule { }
