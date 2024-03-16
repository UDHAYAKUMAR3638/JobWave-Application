import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewCompanyComponent } from './view-company.component';
import { datePipe } from '../../pipe/date.pipe';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const appRoute: Routes = [
  {
    path: "", component: ViewCompanyComponent
  },
]

@NgModule({
  declarations: [ViewCompanyComponent],
  imports: [
    RouterModule.forChild(appRoute),
    MatCardModule,
    CommonModule,
    datePipe,
    FormsModule,
    MatButtonModule,
    MatPaginatorModule,
    FontAwesomeModule
  ],
  // exports: [RouterModule]
})
export class ViewCompanyModule { }
