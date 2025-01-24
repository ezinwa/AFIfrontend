import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Advertisement } from '../models/advertisement';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  ads: Array<Advertisement> = [];
  adSubject: BehaviorSubject<Array<Advertisement>> = new BehaviorSubject(
    this.ads
  );
  user: User = new User();
  usersSubject: BehaviorSubject<User> = new BehaviorSubject(
    this.user
  );

  private ad_api_endpoint = 'http://localhost:9006/ad';


  constructor(private httpcli: HttpClient) { }


  createAdvertisement(Userobj: Advertisement): Observable<any> {
    return this.httpcli.post<Advertisement>(`${this.ad_api_endpoint}/createAd`, Userobj)
  }

  getAdvertisementsFromServer() {
    return this.httpcli
      .get<Advertisement[]>(`${this.ad_api_endpoint}/all`)
      .subscribe((apiAd) => {
        this.ads = apiAd;
        this.adSubject.next(this.ads);
      });
  }
  countAdvertisements(): number {
    return this.ads.length;
  }

  getAdByEmail(email) {
    return this.httpcli
      .get<Advertisement[]>(`${this.ad_api_endpoint}/getAdvertisementByEmail/${email}`)
      .subscribe((apiAd) => {
        this.ads = apiAd;
        this.adSubject.next(this.ads);
      });
  }
  getUserbyEmail(email) {
    return this.httpcli
      .get<User>(`${this.ad_api_endpoint}/getSingleUserByEmail/${email}`)
      .subscribe((apiUser) => {
        this.user = apiUser;
        this.usersSubject.next
      });
  }
  temp(): Observable<User> {
    return this.usersSubject;
  }
  viewAdvertisement(): Observable<Advertisement[]> {
    return this.adSubject;
  }

}
