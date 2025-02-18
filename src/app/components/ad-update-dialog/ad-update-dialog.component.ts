import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Advertisement } from 'src/app/models/advertisement';
import { AdvertisementService } from 'src/app/service/advertisement.service';

@Component({
  selector: 'app-ad-update-dialog',
  templateUrl: './ad-update-dialog.component.html',
  styleUrls: ['./ad-update-dialog.component.css']
})
export class AdUpdateDialogComponent implements OnInit {
  public updateAdForm: FormGroup;

  public ad : Advertisement = new Advertisement();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private adserv: AdvertisementService, private dialogRef: MatDialogRef<AdUpdateDialogComponent>) {
this.updateAdForm = new FormGroup({
  email: new FormControl(data.email, [Validators.required, Validators.email]),
  id: new FormControl(data.id, [Validators.required]),
  ad_price: new FormControl(data.ad_price, [Validators.required]),
  ad_sellingCost: new FormControl(data.ad_sellingCost, [Validators.required]),
  ad_title: new FormControl(data.ad_title, [Validators.required]),
  ad_content: new FormControl(data.ad_content, [Validators.required]),
  ad_seller: new FormControl(data.ad_seller, [Validators.required]),

});


  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  updateAd(){
    this.adserv.updateAdvertisement(this.updateAdForm.value).subscribe(ad =>{console.log("advertisement updated "+this.ad.id)});
    window.location.reload();
  }

  closeDialog() {
    this.dialogRef.close('Some result');
  }

}
