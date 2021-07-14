import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { USERS } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  allUsers : Array<User>

  constructor(
    private http: HttpClient
  ) { }

  fetchUsers(): Promise<Array<User>> {
    return this.http.get<Array<User>>(USERS)
      .toPromise();
  }
}
