import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/interceptors.interceptor';
import { ApplicantComponent } from './applicant/applicant.component';
import { MatButtonModule } from '@angular/material/button';
import { AdminHideDirective } from './custom-directives/admin-hide.directive';
import { AdminShowDirective } from './custom-directives/admin-show.directive';
import { CompanyPageComponent } from './company-page/company-page.component';
import { ViewCompanyComponent } from './view-company/view-company.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApplyButtonHideDirective } from './custom-directives/apply-button-hide.directive';
import { UserDetailsComponent } from './user-details/user-details.component';
import { datePipe } from "./pipe/date.pipe";
import { PaymentDetailsComponent } from './payment-details/payment-details.component';

@NgModule({
  declarations: [AppComponent, ApplicantComponent, ApplyButtonHideDirective, UserDetailsComponent],
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
    datePipe
  ]
})
export class AppModule { }
