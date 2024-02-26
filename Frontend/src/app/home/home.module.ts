import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { LoginShowDirective } from '../custom-directives/loginshow.directive';
import { LoginHideDirective } from '../custom-directives/loginhide.directive';

const appRoute: Routes = [
    {
        path: '', component: HomeComponent, children: [
            {
                path: '',
                loadChildren: () =>
                    import('../job-page/job-page.module').then((d) => d.JobModule)
            },
            {
                path: 'home/job',
                loadChildren: () =>
                    import('../job-page/job-page.module').then((d) => d.JobModule)
            },
            {
                path: 'home/company',
                loadChildren: () =>
                    import('../company-page/company-page.module').then((d) => d.CompanyModule)
            },
            {
                path: 'home/profile',
                loadChildren: () =>
                    import('../profile/profile.module').then((d) => d.ProfileModule)
            },
        ]
    },
    {
        path: 'login',
        loadChildren: () =>
            import('../login/login.module').then((d) => d.LoginModule)
    },
    {
        path: 'recuriter',
        loadChildren: () =>
            import('../recuriter/recuriter.module').then((d) => d.RecuriterModule)
    },
    {
        path: 'typeLogin',
        loadChildren: () =>
            import('../type-login/type-login.module').then((d) => d.TypeLoginModule),
    },
    {
        path: 'recuriterRegister',
        loadChildren: () =>
            import('../recuriter-profile-completion/recuriter-profile-completion.module').then((d) => d.RecuriterProfileCompletionModule),
    },
    {
        path: 'jobseekerRegister',
        loadChildren: () =>
            import('../profile-completion/profile-completion.module').then((d) => d.ProfileCompletionModule),
    },

]

@NgModule({
    declarations: [HomeComponent, LoginShowDirective, LoginHideDirective],
    imports: [
        CommonModule,
        RouterModule.forChild(appRoute),
        FormsModule,
        MatDialogModule,
        MatCardModule,
    ],
    exports: [RouterModule]
})
export class HomeModule { }
