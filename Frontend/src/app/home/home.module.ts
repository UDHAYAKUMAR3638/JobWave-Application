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
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

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
                path: 'profile', canActivate: [AuthGuard, RoleGuard], data: { roles: ['JOBSEEKER', 'RECRUITER', 'ADMIN'] },
                loadChildren: () =>
                    import('../profile/profile.module').then((d) => d.ProfileModule)
            },

            {
                path: "postPage", canActivate: [AuthGuard, RoleGuard], data: { roles: ['RECRUITER'] },
                loadChildren: () =>
                    import('../post-page/post-page.module').then((d) => d.PostModule),
            },

            {
                path: 'jobApply/:postId', canActivate: [AuthGuard, RoleGuard], data: { roles: ['JOBSEEKER'] },
                loadChildren: () =>
                    import('../job-apply/job-apply.module').then((d) => d.JobApplyModule)
            },

            {
                path: 'myPost', canActivate: [AuthGuard, RoleGuard], data: { roles: ['RECRUITER'] },
                loadChildren: () =>
                    import('../my-post/my-post.module').then((d) => d.MyPostModule)
            },

            {
                path: 'myJob', canActivate: [AuthGuard, RoleGuard], data: { roles: ['JOBSEEKER'] },
                loadChildren: () =>
                    import('../my-job/my-job.module').then((d) => d.MyJobModule)
            },

            {
                path: 'findApplicant', canActivate: [AuthGuard, RoleGuard], data: { roles: ['RECRUITER'] },
                loadChildren: () =>
                    import('../find-applicant/find-applicant.module').then((d) => d.FindApplicantModule)
            },

            {
                path: 'bills', canActivate: [AuthGuard, RoleGuard], data: { roles: ['RECRUITER'] },
                loadChildren: () =>
                    import('../bills-page/bills-page.module').then((d) => d.BillsPageModule)
            },

            {
                path: 'addUser', canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] },
                loadChildren: () =>
                    import('../add-user/add-user.module').then((d) => d.AddUserModule)
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
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(appRoute),
        FormsModule,
        MatDialogModule,
        MatCardModule,
        LoginHideDirective,
        LoginShowDirective,
        JobseekerShowDirective,
        RecruiterShowDirective
    ],
    exports: [RouterModule]
})
export class HomeModule { }
