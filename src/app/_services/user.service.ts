import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions, Response } from '@angular/http/';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/User';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';
import { PaginatedResult } from '../_models/Pagination';

@Injectable()
export class UserService {

  baseUrl = environment.apiUrl;

  // constructor(private _http: Http) { }
  constructor(private _authHttp: AuthHttp) { }

  getUser(id): Observable<User> {
    return this._authHttp.get(this.baseUrl + 'users/' + id)
        .map(response => <User>response.json())
        .catch(this.handleError);
  }

  // getUsers(): Observable<User[]> {
  //   return this._authHttp.get(this.baseUrl + 'users')
  //       .map(response => <User[]>response.json())
  //       .catch(this.handleError);
  // }

  getUsers(page?: number, itemsPerPage?: number, userParams?: any, likeParams?: string) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let queryString = '?';

    if (page != null && itemsPerPage != null) {
      queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
    }

    if (likeParams === 'Likers') {
      queryString += 'Likers=true&';
    }

    if (likeParams === 'Likees') {
      queryString += 'Likees=true&';
    }

    if (userParams != null) {
      queryString +=
        'minAge=' + userParams.minAge +
        '&maxAge=' + userParams.maxAge +
        '&gender=' + userParams.gender +
        '&orderBy=' + userParams.orderBy;
    }

    return this._authHttp.get(this.baseUrl + 'users' + queryString)
        .map((response: Response) => {
          paginatedResult.result = response.json();

          if (response.headers.get('Pagination') != null) {
              paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
        .catch(this.handleError);
  }

  updateUser(id: number, user: User) {
    return this._authHttp.put(this.baseUrl + 'users/' + id, user).catch(this.handleError);
  }

  setMainPhoto(userId: number, id: number) {
    return this._authHttp.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {}).catch(this.handleError);
  }

  sendLike(id: number, recipientId: number) {
    return this._authHttp.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {}).catch(this.handleError);
  }

  deletePhoto(userId: number, id: number) {
    return this._authHttp.delete(this.baseUrl + 'users/' + userId + '/photos/' + id).catch(this.handleError);
  }

  /*
  getUsers(): Observable<User[]> {
    return this._http.get(this.baseUrl + 'users', this.jwt())
        .map(response => <User[]>response.json())
        .catch(this.handleError);
  }

  private jwt() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new Headers({ 'Authorization': 'Bearer ' + token});
      headers.append('Content-type', 'application/json');
      return new RequestOptions({ headers : headers});
    }
  }
  */

  private handleError(error) {
    if (error.status === 400) {
      return Observable.throw(error._body);
    }
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }

  const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(modelStateErrors || 'Server error');
  }

}
