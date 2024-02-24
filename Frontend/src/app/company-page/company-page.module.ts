import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyPageComponent } from './company-page.component';
import { Routes, RouterModule } from '@angular/router';

const appRoute: Routes = [
  {
    path: "", component: CompanyPageComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoute),
    CommonModule
  ]
})
export class CompanyModule { }
