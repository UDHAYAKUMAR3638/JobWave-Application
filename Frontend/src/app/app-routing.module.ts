import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const appRoute: Routes = [
  {
    path: '', loadChildren: () =>
      import('./component/home/home.module').then((d) => d.HomeModule),
    // redirectTo
  },

  {
    path: 'home', loadChildren: () =>
      import('./component/home/home.module').then((d) => d.HomeModule),
  },

  {
    path: 'login', loadChildren: () =>
      import('./component/login/login.module').then((d) => d.LoginModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
