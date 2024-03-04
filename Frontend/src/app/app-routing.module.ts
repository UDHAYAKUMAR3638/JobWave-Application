import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
const appRoute: Routes = [
  {
    path: '', loadChildren: () =>
      import('./home/home.module').then((d) => d.HomeModule),
  },

  {
    path: 'home', loadChildren: () =>
      import('./home/home.module').then((d) => d.HomeModule),
  },

  {
    path: 'login', loadChildren: () =>
      import('./login/login.module').then((d) => d.LoginModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoute), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
