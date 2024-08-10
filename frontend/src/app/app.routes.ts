import { Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { AuctionCreateComponent } from './components/auctions/auction-create/auction-create.component';
import { AuctionComponent } from './components/auctions/auction/auction.component';
import { SaleCertificatePageComponent } from './components/sale-certificate-page/sale-certificate-page.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [PublicGuard],
  },
  {
    path: 'sale-certificates',
    component: SaleCertificatePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auction-create',
    component: AuctionCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auction/:id',
    component: AuctionComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
