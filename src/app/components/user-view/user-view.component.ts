import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  users: Array<User> = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsersFromServer();

    this.userService.viewUsers().subscribe(
      result => {
        this.users = result;
      })
    console.log(this.users)
    this.temp();
  }

  temp() {
    var x = this.userService.getUserByEmail(sessionStorage.getItem('email'));
    x.subscribe(data => {
      console.log("x: ", data);
    });

  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter(user => user.userId !== userId);
    });
  }
}
