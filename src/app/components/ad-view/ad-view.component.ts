import { Component, Input, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/models/advertisement';
import { AdvertisementService } from 'src/app/service/advertisement.service';

@Component({
  selector: 'app-ad-view',
  templateUrl: './ad-view.component.html',
  styleUrls: ['./ad-view.component.css']
})
export class AdViewComponent implements OnInit {
  ads: Array<Advertisement> = [];

  constructor(private service: AdvertisementService) { }

  ngOnInit(): void {
    this.service.getAdvertisementsFromServer();

    this.service.viewAdvertisement().subscribe(
      result => {
        this.ads = result;
        console.log(result);
      }
    )

  }

}
