import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/catch';
import 'rxjs/add/observable/of';
import { Message } from '../_models/Message';
import { AuthService } from '../_services/Auth.service';

@Injectable()
export class MessageResolver implements Resolve<Message[]> {
  pageSize = 5;
  pageNumber = 1;
  messageContainer = 'Unread';

  constructor(private userService: UserService, private router: Router,
              private alertify: AlertifyService, private authService: AuthService) { }

  resolve(router: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService.getMessages(this.authService.decodeToken.nameid,
        this.pageNumber, this.pageSize, this.messageContainer).catch(error => {
      this.alertify.error('Problem retrieving data');
      this.router.navigate(['/home']);
      return Observable.of(null);
    });
  }

}
