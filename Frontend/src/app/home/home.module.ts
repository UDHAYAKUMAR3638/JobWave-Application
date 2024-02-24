import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

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
            }
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

]

@NgModule({
    declarations: [],
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
