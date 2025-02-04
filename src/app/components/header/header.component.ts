import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { OrganicRouterService } from 'src/app/service/organic-router.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;

  loginSwitch: boolean = true;
  displayMenu = false;
  displaySub = false;
  displayComp = false;
  currentRole: String;


  constructor(private orgserv: OrganicRouterService, private service: UserService) { }

  ngOnInit(): void {
    this.service.updatemenu.subscribe(res => {
      this.MenuDisplay();
    })
    this.MenuDisplay();


  }
  ln() {
    this.orgserv.openLogin();
  }


  MenuDisplay() {
    if (sessionStorage.getItem("loggedin") === "true") {
      this.loggedIn = true
      console.log("testing ")
      this.currentRole = sessionStorage.getItem("role")
      this.displayComp = this.currentRole == "COMPANY";
      this.displaySub = this.currentRole == "SUBSCRIBER";
    }
    else {
      this.loggedIn = false;
      this.displayComp = false;
      this.displaySub = false;
    }
  }

  logout() {
    sessionStorage.clear();
    sessionStorage.setItem("loggedIn", "false")
    this.service.updatemenu.next()
    this.orgserv.openHome();
  }

}
