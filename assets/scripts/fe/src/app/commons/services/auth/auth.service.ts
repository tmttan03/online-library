import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AUTH_LOGIN, AUTH_USER, AUTH_REGISTER, NEW_USER, AUTH_USER_ID } from '../../constants/api.constants';
import { AUTH_KEY } from '../../constants/conf.constants';
import { User } from '../../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user = new User;
  public user_id: any;

  constructor(
    private http: HttpClient,
  ) { }


  /* USER LOGIN
   * @desc : sends a request to the backend server to
   *         to check for the credentials and returns
   *         a generated token.
   */
  login(creds) {
    return this.http.post(AUTH_LOGIN, creds)
      .toPromise()
      .then(resp => { this.setToken(resp); this.authUser(Object(resp).user_id); return resp; })
      .catch(err => { console.log(err); return Promise.reject(err); })
    ;
  }

  /**REGISTER USER */
  register(creds) {
    return this.http.post(AUTH_REGISTER, creds)
    .toPromise()
    .then(resp => { return resp; })
    .catch(err => { return Promise.reject(err); });

  }

  /**NEW USER */
  newUser(creds) {
    return this.http.post(NEW_USER, creds)
    .toPromise()
    .then(resp => { this.setToken(resp); this.authUser(Object(resp).user_id); return resp; })
    .catch(err => { return Promise.reject(err); });
  }

  /* MANAGE USER TOKEN
   * @desc : manage user token generated from the backend
   *         to be used on authenticated requests
   */
  setToken(token) {
    // save the generated token to the local storage
    (<any>window).localStorage[AUTH_KEY] = JSON.stringify(token);
    return;
  }

  getToken() {
    // fetch the generated token from the storage
    const d = (<any>window).localStorage[AUTH_KEY];
    if (!d) return null;
    return JSON.parse(d);
  }

  getUser() {
    this.user_id = this.getToken().user_id;
    if(this.user.id === '') {
      this.authUser(this.user_id);
    }
  }

  rmToken() {
    // clear the token from the local storage.
    (<any>window).localStorage.clear();
  }

  /* MANAGE USER INSTANCE
   * @desc : manage user instance.
   */
  authenticated() {
    // check if the user is authenticated
    return this.getToken() ? true : false;
  }

  setuser() {
    // save the user's instance
    return this.http.get(AUTH_USER)
      .toPromise()
      .then(resp => { this.user = new User(resp); })
      .catch(err => { return Promise.reject(err); })
    ;
  }

  getuser() {
    // fetch the user instance
    if (this.user.id == null) {
      // sends a request from the backend to
      // get the data.
      this.setuser();
    }
    return this.user;
  }

  authUser(id) {
   this.http.get(AUTH_USER_ID, {params: {'id': id}}).subscribe(
      result => {
        this.user = new User(result);
      },
      error => {
        console.log(error);
      }
    );
  }

}
