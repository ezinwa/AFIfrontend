import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role = sessionStorage.getItem("role");
    const loginstatus = sessionStorage.getItem("loggedin")
    if (role === "SUBSCRIBER" && loginstatus === "true") {
      return true;
    }
    return false;
  }

}
