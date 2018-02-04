import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from './_services/Auth.service';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private _auth: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this._auth.decodeToken = this.jwtHelper.decodeToken(token);
    }
  }
}
