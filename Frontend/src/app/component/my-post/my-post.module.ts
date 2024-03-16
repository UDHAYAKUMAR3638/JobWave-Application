import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCard, MatCardModule } from '@angular/material/card';
import { datePipe } from "../../pipe/date.pipe";
import { FormsModule } from '@angular/forms';
import { MyPostComponent } from './my-post.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

const appRoute: Routes = [
    {
        path: "", component: MyPostComponent
    },
]

@NgModule({
    declarations: [MyPostComponent],
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
export class MyPostModule { }
