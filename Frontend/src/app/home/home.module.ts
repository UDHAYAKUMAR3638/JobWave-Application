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
                path: 'job',
                loadChildren: () =>
                    import('../job-page/job-page.module').then((d) => d.JobModule)
            },
            {
                path: 'profile',
                loadChildren: () =>
                    import('../profile/profile.module').then((d) => d.ProfileModule)
            },
            {
                path: "postPage",
                loadChildren: () =>
                    import('../post-page/post-page.module').then((d) => d.PostModule),
            },
            {
                path: 'jobApply',
                loadChildren: () =>
                    import('../job-apply/job-apply.module').then((d) => d.JobApplyModule)
            },
            {
                path: 'myPost',
                loadChildren: () =>
                    import('../my-post/my-post.module').then((d) => d.MyPostModule)
            },
            {
                path: 'myJob',
                loadChildren: () =>
                    import('../my-job/my-job.module').then((d) => d.MyJobModule)
            },
            {
                path: 'findApplicant',
                loadChildren: () =>
                    import('../find-applicant/find-applicant.module').then((d) => d.FindApplicantModule)
            },
            {
                path: 'bills',
                loadChildren: () =>
                    import('../bills-page/bills-page.module').then((d) => d.BillsPageModule)
            },

        ]
    },


    {
        path: 'login',
        loadChildren: () =>
            import('../login/login.module').then((d) => d.LoginModule)
    },

    {
        path: 'typeLogin',
        loadChildren: () =>
            import('../type-login/type-login.module').then((d) => d.TypeLoginModule),
    },
    {
        path: 'recruiterRegister',
        loadChildren: () =>
            import('../recruiter-profile-completion/recruiter-profile-completion.module').then((d) => d.RecruiterProfileCompletionModule),
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
