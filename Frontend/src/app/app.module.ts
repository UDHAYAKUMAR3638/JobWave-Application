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
import { ProfileCompletionComponent } from './profile-completion/profile-completion.component';
import { TypeLoginComponent } from './type-login/type-login.component';
import { RecuriterProfileCompletionComponent } from './recuriter-profile-completion/recuriter-profile-completion.component';

@NgModule({
  declarations: [AppComponent],
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
