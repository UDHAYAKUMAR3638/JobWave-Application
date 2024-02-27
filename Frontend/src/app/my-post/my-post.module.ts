import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCard, MatCardModule } from '@angular/material/card';
import { datePipe } from "../pipe/date.pipe";
import { FormsModule } from '@angular/forms';
import { MyPostComponent } from './my-post.component';

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
        FormsModule
    ]
})
export class MyPostModule { }
