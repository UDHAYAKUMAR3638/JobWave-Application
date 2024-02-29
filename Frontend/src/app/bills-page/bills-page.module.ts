import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { datePipe } from "../pipe/date.pipe";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BillsPageComponent } from './bills-page.component';

const appRoute: Routes = [
    {
        path: "", component: BillsPageComponent
    },
]

@NgModule({
    declarations: [BillsPageComponent],
    imports: [
        RouterModule.forChild(appRoute),
        MatCardModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        datePipe
    ]
})
export class BillsPageModule { }
