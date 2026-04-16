import { Routes } from '@angular/router';

import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

import { aboutComponent as AboutComponent } from './pages/About/about.component';
import { contactComponent as ContactComponent } from './pages/contact/contact.component';

import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

import { authGuard } from './core/auth.guard';
import { guestGuard } from './guest.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    data: { navbar: 'protected' },
  },

  {
    path: 'shop',
    component: ShopComponent,
    data: { navbar: 'protected' }
  },

  {
    path: 'shop/:slug',
    component: ShopComponent,
    data: { navbar: 'protected' }
  },

  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard],
    data: { navbar: 'protected' }
  },

  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [authGuard],
    data: { navbar: 'protected' }
  },

  {
    path: 'about',
    component: AboutComponent,
    canActivate: [authGuard],
    data: { navbar: 'protected' },
  },

  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [authGuard],
    data: { navbar: 'protected' },
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard],
    data: { navbar: 'auth' },
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [guestGuard],
    data: { navbar: 'auth' },
  },

  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    canActivate: [guestGuard],
    data: { navbar: 'auth' },
  },

  { path: '**', component: NotfoundComponent },
];
