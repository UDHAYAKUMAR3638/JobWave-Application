import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewCompanyComponent } from './view-company.component';

const appRoute: Routes = [
  {
    path: "", component: ViewCompanyComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoute),
  ],
  exports: [RouterModule]
})
export class ViewCompanyModule { }
