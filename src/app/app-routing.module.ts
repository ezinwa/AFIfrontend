import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdViewComponent } from './components/ad-view/ad-view.component';
import { AdvertisementCreationComponent } from './components/advertisement-creation/advertisement-creation.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyAdsComponent } from './components/my-ads/my-ads.component';
import { RegisterComponent } from './components/register/register.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { CompanyGuard } from './guard/company.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'reg', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adview', component: AdViewComponent },
  { path: 'userview', component: UserViewComponent },
  { path: 'adcreation', component: AdvertisementCreationComponent },
  { path: 'minasidor', component: MyAdsComponent, canActivate: [CompanyGuard] },










  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
