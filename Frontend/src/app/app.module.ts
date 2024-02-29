import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/interceptors.interceptor';
import { ApplicantComponent } from './applicant/applicant.component';
import { MatButtonModule } from '@angular/material/button';
import { BillsPageComponent } from './bills-page/bills-page.component';
import { RecruiterShowDirective } from './custom-directives/recruiter-show.directive';
import { JobseekerShowDirective } from './custom-directives/jobseeker-show.directive';

@NgModule({
  declarations: [AppComponent, ApplicantComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
