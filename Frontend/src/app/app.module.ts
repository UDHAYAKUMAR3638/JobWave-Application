import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/interceptors.interceptor';
import { ApplicantComponent } from './component/applicant/applicant.component';
import { MatButtonModule } from '@angular/material/button';
import { ApplyButtonHideDirective } from './custom-directives/apply-button-hide.directive';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { datePipe } from "./pipe/date.pipe";
import { UserAppliedJobsComponent } from './component/user-applied-jobs/user-applied-jobs.component';
import { UserPostedJobsComponent } from './component/user-posted-jobs/user-posted-jobs.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RegistrationComponent } from './component/registration/registration.component';

@NgModule({
  declarations: [AppComponent, ApplicantComponent, ApplyButtonHideDirective, UserDetailsComponent, UserAppliedJobsComponent, UserPostedJobsComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    datePipe,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class AppModule { }
