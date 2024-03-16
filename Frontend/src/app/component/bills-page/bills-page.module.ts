import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { datePipe } from "../../pipe/date.pipe";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BillsPageComponent } from './bills-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

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
        datePipe,
        MatPaginatorModule,
        MatTableModule,
    ]
})
export class BillsPageModule { }
