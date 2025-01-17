import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from 'src/app/service/advertisement.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adCount: number = 0;
  userCount: number = 0;

  constructor(private adService: AdvertisementService, private userService: UserService) { }

  ngOnInit(): void {
    this.adCount = this.adService.countAdvertisements();
    this.userCount = this.userService.getUserCount();
  }
}
