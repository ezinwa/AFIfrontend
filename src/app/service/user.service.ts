import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
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

  private updateMenu = new Subject<void>();

  get updatemenu() {
    return this.updateMenu;
  }


  // POST creates a user
  createUser(Userobj: User): Observable<any> {
    return this.httpcli.post<User>(`${this.user_api_endpoint}/register`, Userobj)
  }

  getUserByEmail(email: String): Observable<User> {
    return this.httpcli.get<User>(`${this.user_api_endpoint}/${email}`)
  }

  // POST login user and retrieves a token
  //logInUser(loginform): Observable<any> {
  //  let reqbody =[email,password,role]
  //  return this.httpcli.post<User>(`${this.user_api_endpoint}/login`, reqbody)
  //}
  logInUser(Userobj: User): Observable<any> {
    return this.httpcli.post<User>(`${this.user_api_endpoint}/login`, Userobj)
  }

  // generateTokenFromServer(Userobj: UserProfile): Observable<any> {
  //   console.log("i gen token from serv: " + Userobj.role)
  //   return this.httpcli.post<UserProfile>("http://localhost:8992/user/login", Userobj)
  // }


  // DELETE user
  deleteUser(userId: number): Observable<any> {
    return this.httpcli
      .delete(`${this.user_api_endpoint}/deleteUser/${userId}`)
      .pipe(
        tap(() => {
          let indx = this.users.findIndex((user) => user.userId === userId);
          if (indx > -1) {
            this.users.splice(indx, 1);
            this.usersSubject.next(this.users);
          }
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

  getUserCount(): number {
    console.log("user count: " + this.users.length)
    return this.users.length;
  }
}
