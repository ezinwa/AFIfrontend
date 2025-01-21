import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from 'src/app/service/advertisement.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adCount: number;
  userCount: number;

  constructor(private adService: AdvertisementService, private userService: UserService) { }

  ngOnInit(): void {
    this.adService.getAdvertisementsFromServer();
    this.adService.viewAdvertisement().subscribe(ads => {
      this.adCount = ads.length;
    });

    this.userService.getUsersFromServer();
      this.userService.viewUsers().subscribe(users => {
        this.userCount = users.length;
      });
    }
  }

