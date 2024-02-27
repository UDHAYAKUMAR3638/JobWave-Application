import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPageComponent } from './job-page.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCard, MatCardModule } from '@angular/material/card';
import { datePipe } from "../pipe/date.pipe";
import { FormsModule } from '@angular/forms';

const appRoute: Routes = [
  {
    path: "", component: JobPageComponent
  },
]

@NgModule({
  declarations: [JobPageComponent],
  imports: [
    RouterModule.forChild(appRoute),
    MatCardModule,
    CommonModule,
    datePipe,
    FormsModule
  ]
})
export class JobModule { }
