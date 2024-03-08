import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

const homeRoute: Routes = [
    {
        path: '', component: HomeComponent, children: [

            {
                path: '', redirectTo: 'job', pathMatch: 'full'
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

            {
                path: 'company', canActivate: [AuthGuard, RoleGuard], data: { roles: ['JOBSEEKER'] },
                loadChildren: () =>
                    import('../company-page/company-page.module').then((d) => d.CompanyPageModule)
            },

            {
                path: "viewCompany/:id", canActivate: [AuthGuard, RoleGuard], data: { roles: ['JOBSEEKER'] },
                loadChildren: () =>
                    import('../view-company/view-company.module').then((d) => d.ViewCompanyModule)
            },

            {
                path: 'viewUser', canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] },
                loadChildren: () =>
                    import('../view-user/view-user.module').then((d) => d.ViewUserModule)
            },

            {
                path: 'payment', canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] },
                loadChildren: () =>
                    import('../payment-details/payment-details.module').then((d) => d.PaymentDetailsModule),
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
            import('../jobseeker-profile-completion/jobseeker-profile-completion.module').then((d) => d.ProfileCompletionModule),
    },

]

@NgModule({
    imports: [RouterModule.forChild(homeRoute)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }