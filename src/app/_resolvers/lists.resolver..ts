import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
  pageSize = 5;
  pageNumber = 1;
  likeParam = 'Likers';

  constructor(private userService: UserService, private router: Router,
              private alertify: AlertifyService) { }

  resolve(router: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likeParam).catch(error => {
      this.alertify.error('Problem retrieving data');
      this.router.navigate(['/home']);
      return Observable.of(null);
    });
  }

}
