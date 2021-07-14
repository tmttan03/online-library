import * as _ from 'lodash';

import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user.model';


/* LOGIN REQUIRED
 * @desc : callback function that will check and will not pass
 *         users that are not logged in.
 */
export function LoginRequired(t) {
  let auth = t.injector().get(AuthService),
      state = t.router.stateService;

  if(!auth.authenticated()) return state.target('login');

}


/* DISCONNECT
 * @desc : callback function that will log user out.
 *         (removes/clear the user token)
 */
export function Disconnect(t) {
  let auth = t.injector().get(AuthService),
      state = t.router.stateService;

  if(auth.authenticated())
  {
    auth.rmToken();
    auth.user = new User();
  }
  return state.target('login', {next: '/dashboard/'});

}

export function Deactivate(t) {
  let auth = t.injector().get(AuthService),
      state = t.router.stateService;

  if(auth.authenticated())
  {
    auth.rmToken();
    auth.user = new User();
  }
  return state.target('log-in', {"deactivate": true}, {next: '/dashboard/'});

}


