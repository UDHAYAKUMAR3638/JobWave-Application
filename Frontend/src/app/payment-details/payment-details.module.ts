import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { datePipe } from "../pipe/date.pipe";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaymentDetailsComponent } from './payment-details.component';
import { MatTableModule } from '@angular/material/table';

const appRoute: Routes = [
    {
        path: "", component: PaymentDetailsComponent
    },
]

@NgModule({
    declarations: [PaymentDetailsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(appRoute),
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        datePipe
    ]
})
export class PaymentDetailsModule { }
