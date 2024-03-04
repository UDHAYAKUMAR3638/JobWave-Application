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

@NgModule({
  declarations: [AppComponent, ApplicantComponent, CompanyPageComponent],

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
