import { Component, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/models/advertisement';
import { AdvertisementService } from 'src/app/service/advertisement.service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit {

  constructor(private service: AdvertisementService) { }
  ads: Array<Advertisement> = [];

  ngOnInit(): void {
    this.service.getAdByEmail(sessionStorage.getItem('email'));

    this.service.viewAdvertisement().subscribe(
      result => {
        this.ads = result;
        console.log(result);
      }
    )
  }

}
