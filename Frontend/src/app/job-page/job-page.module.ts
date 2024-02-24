import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPageComponent } from './job-page.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCard, MatCardModule } from '@angular/material/card';

const appRoute: Routes = [
  {
    path: "", component: JobPageComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoute),
    MatCardModule,
    CommonModule
  ]
})
export class JobModule { }
