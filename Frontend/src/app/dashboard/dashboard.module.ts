import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CanEditDirective } from '../custom-directives/can-edit.directive';

const appRoute: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'appointmentComp',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../appointment-comp/appointment-comp.module').then(
            (d) => d.AppointmentCompModule
          ),
      },

      // {
      //   path: 'search',
      //   canActivate: [AuthGuard],
      //   loadChildren: () =>
      //     import('../search/search.module').then((d) => d.SearchModule),
      // },
      {
        path: 'appointment',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../appointment/appointment.module').then(
            (d) => d.AppointmentModule
          ),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../profile/profile.module').then((d) => d.ProfileModule),
      },

      {
        path: 'add-user',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../add-user/add-user.module').then((d) => d.UserModule),
      },

      {
        path: 'viewUser',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../view-user/view-user.module').then((d) => d.ViewUserModule),
      },

    ],
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, RouterModule.forChild(appRoute),
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule],
  exports: [RouterModule],
})
export class DashboardModule { }
