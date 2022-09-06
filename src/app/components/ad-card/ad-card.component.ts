import { Component, Input, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/models/advertisement';
import { AdvertisementService } from 'src/app/service/advertisement.service';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})
export class AdCardComponent implements OnInit {
  @Input()
  ad: Advertisement = new Advertisement();
  constructor(private service: AdvertisementService) { }

  ngOnInit(): void {

  }
}
