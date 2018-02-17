import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/Auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

  constructor(private userService: UserService, private router: Router,
              private alertify: AlertifyService, private auth: AuthService) { }

  resolve(router: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.auth.decodeToken.nameid).catch(error => {
      this.alertify.error('Problem retrieving data');
      this.router.navigate(['/members']);
      return Observable.of(null);
    });
  }

}
