import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertisementService } from 'src/app/service/advertisement.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-advertisement-creation',
  templateUrl: './advertisement-creation.component.html',
  styleUrls: ['./advertisement-creation.component.css']
})
export class AdvertisementCreationComponent implements OnInit {
  public advertisementForm: FormGroup
  role: String = sessionStorage.getItem("role");

  constructor(private fb: FormBuilder, private service: AdvertisementService, private userService: UserService) { }

  ngOnInit(): void {
    var holder = '40';
      if (sessionStorage.getItem("role") === "SUBSCRIBER") {
        holder = "0";
      }
      if (sessionStorage.getItem("role") === "COMPANY") {
        holder = "40";
      }
    this.advertisementForm = this.fb.group({

      email: new FormControl('', [Validators.required, Validators.email]),
      ad_price: new FormControl('', [Validators.required]),
      ad_sellingCost: new FormControl(holder, [Validators.required]),
      ad_postnummer: new FormControl('', [Validators.required]),
      ad_ort: new FormControl('', [Validators.required]),
      ad_telefon: new FormControl('', [Validators.required]),
      ad_utdelningsadress: new FormControl('', [Validators.required]),
      ad_title: new FormControl('', [Validators.required]),
      ad_content: new FormControl('', [Validators.required]),
      ad_seller: new FormControl('', [Validators.required]),

    });
  }

  fyllIOmSub() {
    if (!(sessionStorage.getItem("role") === "SUBSCRIBER")) {
      this.advertisementForm.value.email = sessionStorage.getItem("email");
      this.userService.getUserByEmail("1").subscribe(user => {
        this.advertisementForm.value.ad_ort = user.city;
        this.advertisementForm.value.ad_namn = user.firstName + " " + user.lastName;
        this.advertisementForm.value.ad_postnummer = user.postnummer;
        this.advertisementForm.value.ad_seller = user.city;
        this.advertisementForm.value.ad_ort = user.city;

        this.advertisementForm.value.ad_content = "40";
        this.advertisementForm.value.ad_sellingCost = "40";
      });

    }
  }

  createAd() {
    console.log("före createAd" + this.advertisementForm.value.ad_sellingCost)
    if (!(sessionStorage.getItem("role") === "SUBSCRIBER")) {
      this.advertisementForm.value.ad_sellingCost = "40"
    } else {
      this.advertisementForm.value.ad_sellingCost = "0"
    }

    console.log("efter createAd" + this.advertisementForm.value.ad_sellingCost)


    console.log(this.advertisementForm.value)
    this.service.createAdvertisement(this.advertisementForm.value).subscribe(
      (res) => {

        console.log("new Ad created")
      }
    )
  }
}
