import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { LoginShowDirective } from '../custom-directives/loginshow.directive';
import { LoginHideDirective } from '../custom-directives/loginhide.directive';
import { RecruiterShowDirective } from '../custom-directives/recruiter-show.directive';
import { JobseekerShowDirective } from '../custom-directives/jobseeker-show.directive';
import { AdminShowDirective } from '../custom-directives/admin-show.directive';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        RouterModule,
        FormsModule,
        MatDialogModule,
        MatCardModule,
        LoginHideDirective,
        LoginShowDirective,
        JobseekerShowDirective,
        RecruiterShowDirective,
        AdminShowDirective
    ],
})

export class HomeModule { }
