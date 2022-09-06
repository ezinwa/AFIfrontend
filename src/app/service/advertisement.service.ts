import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Advertisement } from '../models/advertisement';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  ads: Array<Advertisement> = [];
  adSubject: BehaviorSubject<Array<Advertisement>> = new BehaviorSubject(
    this.ads
  );

  private ad_api_endpoint = 'http://localhost:9006/ad';


  constructor(private httpcli: HttpClient) { }


  createAdvertisement(Userobj: Advertisement): Observable<any> {
    return this.httpcli.post<Advertisement>(`${this.ad_api_endpoint}/createAd`, Userobj)
  }

  getAdvertisementsFromServer() {
    return this.httpcli
      .get<Advertisement[]>(`${this.ad_api_endpoint}/all`)
      .subscribe((apiUsers) => {
        this.ads = apiUsers;
        this.adSubject.next(this.ads);
      });
  }

  viewAdvertisement(): Observable<Advertisement[]> {
    return this.adSubject;
  }

}
