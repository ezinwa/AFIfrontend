import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertisementService } from 'src/app/service/advertisement.service';

@Component({
  selector: 'app-advertisement-creation',
  templateUrl: './advertisement-creation.component.html',
  styleUrls: ['./advertisement-creation.component.css']
})
export class AdvertisementCreationComponent implements OnInit {
  public advertisementform: FormGroup

  constructor(private fb: FormBuilder, private service: AdvertisementService) {
    this.advertisementform = this.fb.group({

      email: new FormControl('', [Validators.required, Validators.email]),
      ad_price: new FormControl('', [Validators.required]),
      ad_title: new FormControl('', [Validators.required]),
      ad_content: new FormControl('', [Validators.required]),
      ad_seller: new FormControl('', [Validators.required]),
      ad_sellingPrice: new FormControl('', [Validators.required]),

    });

  }

  ngOnInit(): void {
  }

  createAd() {
    console.log("före creartAd" + this.advertisementform.value.ad_sellingPrice)
    if (!(sessionStorage.getItem("role") === "SUBSCRBER")) {
      this.advertisementform.value.ad_sellingPrice = "40"
    }
    console.log("efter createAd" + this.advertisementform.value.ad_sellingPrice)


    console.log(this.advertisementform.value)
    this.service.createAdvertisement(this.advertisementform.value).subscribe(
      (res) => {

        console.log("new Ad created")
      }
    )
  }
}
