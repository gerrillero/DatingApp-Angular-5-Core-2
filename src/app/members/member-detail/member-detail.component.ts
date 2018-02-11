import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/User';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user: User;
  constructor(private _userService: UserService, private _alertify: AlertifyService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this._userService.getUser(+this._route.snapshot.params['id']).subscribe((user: User) => {
        this.user = user;
    }, error => {
      this._alertify.error(error);
    });
  }
}
