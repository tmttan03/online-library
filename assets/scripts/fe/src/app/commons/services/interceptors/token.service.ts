import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { StateService } from '@uirouter/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private auth: AuthService,
    private cookie: CookieService
  ) { }

  intercept (r: HttpRequest<any>, n: HttpHandler) : Observable <HttpEvent <any>> {
    const token = this.auth.getToken();
    if (token == null) {
      r = r.clone({
            setHeaders: {
              'X-CSRFToken'   : this.csrfToken(),
            }
          });
          return n.handle(r).pipe(tap(
            resp => {
              if (resp instanceof HttpResponse) return resp;
            }
          ));
    } else {
      r = r.clone({
            setHeaders: {
              'X-CSRFToken'   : this.csrfToken(),
              'Authorization' : this.token(),
            }
          });
          return n.handle(r).pipe(tap(
            resp => {
              if (resp instanceof HttpResponse) return resp;
            }
          ));
    }
  }

  // Get user token from the local storage
  // and format if to be placed into the request header.
  token () {
    const t = _.get(this.auth.getToken(), ['token'], null);
    return `Token ${t}`;
  }

  csrfToken() {
    const xtoken = this.cookie.get('csrftoken');
    return xtoken;
  }
}
