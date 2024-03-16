import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyPageComponent } from './company-page.component';
import { ViewCompanyComponent } from '../view-company/view-company.component';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

const appRoute: Routes = [
  {
    path: "", component: CompanyPageComponent,
  },

]

@NgModule({
  declarations: [CompanyPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoute),
    FormsModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  exports: [RouterModule]
})

export class CompanyPageModule { }
