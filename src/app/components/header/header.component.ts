import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedin = false;

  constructor() { }

  ngOnInit(): void {


  }

  logout() {
    sessionStorage.clear();
    sessionStorage.setItem("loggedIn", "false")
  }

}
