import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrganicRouterService {

  constructor(private router: Router) { }

  openLogin() {
    this.router.navigate(['login']);
  }
  openHome() {
    this.router.navigate(['home']);
  }

  openReg() {
    this.router.navigate(['reg']);
  }

  openAdview() {
    this.router.navigate(['adview']);
  }

  openUserview() {
    this.router.navigate(['userview']);
  }

  openAdcreation() {
    this.router.navigate(['adcreation']);
  }
  openMinsidor() {
    this.router.navigate(['minasidor']);
  }
}
