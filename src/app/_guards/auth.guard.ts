import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_services/Auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { fail } from 'assert';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authServices: AuthService, private router: Router, private alertify: AlertifyService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authServices.loggedIn()) {
      return true;
    }

    this.alertify.error('You need to be loggin to acces this area');
    this.router.navigate(['/home']);
    return false;
  }
}
