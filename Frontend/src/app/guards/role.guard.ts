import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { AlertService } from '../service/alert.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private alertService: AlertService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.loginService.hasRole(route.data['roles'] as string[]))
      return true;
    else {
      this.alertService.alertMessage('Your role is not authorized!', `Can't access`, 'error');
      this.router.navigate(['home']);
      return false;
    }

  }

}
