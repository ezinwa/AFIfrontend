import { Component, Input, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/models/advertisement';
import { AdvertisementService } from 'src/app/service/advertisement.service';
import { MatDialog } from '@angular/material/dialog';
import { AdUpdateDialogComponent } from '../ad-update-dialog/ad-update-dialog.component';
@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css']
})
export class AdCardComponent implements OnInit {
  @Input()
  ad: Advertisement = new Advertisement();
  constructor(private service: AdvertisementService, private dialog: MatDialog) { }

  ngOnInit(): void {

  }
  openDialog() {
    const dialogRef = this.dialog.open(AdUpdateDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
    });
  }
}
