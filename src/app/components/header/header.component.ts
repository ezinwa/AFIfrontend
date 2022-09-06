import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  users: Array<User> = [];

  constructor(private userservice: UserService) { }

  ngOnInit(): void {
    this.userservice.getUsersFromServer();

    this.userservice.viewUsers().subscribe(
      result => {
        this.users = result;
        console.log(result)

      })
  }

}
