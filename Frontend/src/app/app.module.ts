import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/interceptors.interceptor';
import { CanBookDirective } from './custom-directives/can-book.directive';
import { JobPageComponent } from './job-page/job-page.component';
import { CompanyPageComponent } from './company-page/company-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { RecuriterComponent } from './recuriter/recuriter.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, JobPageComponent, CompanyPageComponent, PostPageComponent, RecuriterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
