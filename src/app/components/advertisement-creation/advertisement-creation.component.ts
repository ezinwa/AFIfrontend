import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertisementService } from 'src/app/service/advertisement.service';

@Component({
  selector: 'app-advertisement-creation',
  templateUrl: './advertisement-creation.component.html',
  styleUrls: ['./advertisement-creation.component.css']
})
export class AdvertisementCreationComponent implements OnInit {
  public advertisementForm: FormGroup
  role: String = sessionStorage.getItem("role");

  constructor(private fb: FormBuilder, private service: AdvertisementService) {}

  ngOnInit(): void {
    this.advertisementForm = this.fb.group({

      email: new FormControl('', [Validators.required, Validators.email]),
      ad_price: new FormControl('', [Validators.required]),
      ad_title: new FormControl('', [Validators.required]),
      ad_content: new FormControl('', [Validators.required]),
      ad_seller: new FormControl('', [Validators.required]),
      ad_sellingPrice: new FormControl('', [Validators.required]),

    });
  }

  createAd() {
    console.log("före creartAd" + this.advertisementForm.value.ad_sellingPrice)
    if (!(sessionStorage.getItem("role") === "SUBSCRIBER")) {
      this.advertisementForm.value.ad_sellingPrice = "40"
    }
    console.log("efter createAd" + this.advertisementForm.value.ad_sellingPrice)


    console.log(this.advertisementForm.value)
    this.service.createAdvertisement(this.advertisementForm.value).subscribe(
      (res) => {

        console.log("new Ad created")
      }
    )
  }
}
