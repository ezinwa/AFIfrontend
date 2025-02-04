import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { User } from 'src/app/models/user';
import { AdvertisementService } from 'src/app/service/advertisement.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-advertisement-creation',
  templateUrl: './advertisement-creation.component.html',
  styleUrls: ['./advertisement-creation.component.css']
})
export class AdvertisementCreationComponent implements OnInit {
  public advertisementForm: FormGroup
  user: User = new User();
  role: String = sessionStorage.getItem("role");
  email: String = sessionStorage.getItem("email");

  constructor(private fb: FormBuilder, private service: AdvertisementService, private userService: UserService) { }

  ngOnInit(): void {
    this.advertisementForm = this.fb.group({

      email: new FormControl(this.email, [Validators.required, Validators.email]),
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
    var newuse = this.userService.getUserByEmail(sessionStorage.getItem('email'));
    var holder = '40';
    if (sessionStorage.getItem("role") === "SUBSCRIBER") {
      holder = "0";
    }
    if (sessionStorage.getItem("role") === "COMPANY") {
      holder = "40";

    }

    console.log(this.user)

    var userByemail = this.userService.getUserByEmail(sessionStorage.getItem('email'));
    userByemail.subscribe(data => {
      this.user = data;
      var utdelningsadress = "";

      if (data.city != null) {
        utdelningsadress = data.city;
      }
      if (data.street != null) {
        utdelningsadress += " " + data.street;
      }
      if (data.postnummer != null) {
        utdelningsadress += " " + data.postnummer;
      }
      this.advertisementForm.controls['ad_seller'].setValue(data.firstName + " " + data.lastName);
      this.advertisementForm.controls['email'].setValue(data.email);
      this.advertisementForm.controls['ad_telefon'].setValue(data.phoneNumber);
      this.advertisementForm.controls['ad_utdelningsadress'].setValue(utdelningsadress);

    });
    console.log(this.user)



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
