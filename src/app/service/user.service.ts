import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Array<User> = [];
  usersSubject: BehaviorSubject<Array<User>> = new BehaviorSubject(
    this.users
  );

  private user_api_endpoint = 'http://localhost:9005/user';

  constructor(private httpcli: HttpClient) { }

  // POST creates a user
  createUser(Userobj: User): Observable<any> {
    return this.httpcli.post<User>(`${this.user_api_endpoint}/register`, Userobj)
  }

  // POST login user and retrieves a token
  logInUser(Userobj: User): Observable<any> {
    return this.httpcli.post<User>(`${this.user_api_endpoint}/login`, Userobj)
  }

  // generateTokenFromServer(Userobj: UserProfile): Observable<any> {
  //   console.log("i gen token from serv: " + Userobj.role)
  //   return this.httpcli.post<UserProfile>("http://localhost:8992/user/login", Userobj)
  // }


  // DELETE user
  deleteUser(userId) {
    return this.httpcli
      .delete(`${this.user_api_endpoint}/deleteUser/${userId}`)
      .pipe(
        tap((userId) => {
          let indx = this.users.findIndex((user) => user.userId === userId);
          this.users.splice(indx, 1);
          this.usersSubject.next(this.users);
        })
      );
  }

  // GET all users from the server
  getUsersFromServer() {
    return this.httpcli
      .get<User[]>(`${this.user_api_endpoint}/getAllUsers`)
      .subscribe((apiUsers) => {
        this.users = apiUsers;
        this.usersSubject.next(this.users);
      });
  }
  viewUsers(): Observable<User[]> {
    return this.usersSubject;
  }
}
