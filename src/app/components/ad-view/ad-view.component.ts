import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Advertisement } from 'src/app/models/advertisement';
import { AdvertisementService } from 'src/app/service/advertisement.service';
import { AdUpdateDialogComponent } from '../ad-update-dialog/ad-update-dialog.component';

@Component({
  selector: 'app-ad-view',
  templateUrl: './ad-view.component.html',
  styleUrls: ['./ad-view.component.css']
})
export class AdViewComponent implements OnInit {
  ads: Array<Advertisement> = [];

  constructor(private service: AdvertisementService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.getAdvertisementsFromServer();

    this.service.viewAdvertisement().subscribe(
      result => {
        this.ads = result;
        console.log(result);
      }
    )

  }
  openDialog(ad: Advertisement) {
    const dialogRef = this.dialog.open(AdUpdateDialogComponent, {
      data: ad
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }

}
