import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { WishlistService } from '../../wishlist.service';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  wishlistItems: any[] = [];

  constructor(
    private wishlist: WishlistService,
    private cart: CartService,
    private router: Router
  ) {

    this.wishlist.wishlistItems$.subscribe((items: any[]) => {
      this.wishlistItems = items;
    });

  }

  goBack() {
    this.router.navigate(['/shop']);
  }

  remove(item: any) {
    this.wishlist.removeFromWishlist(item);
  }

  moveToCart(item: any) {

    this.cart.addToCart(item);      // يضيف للكارت
    this.wishlist.removeFromWishlist(item); // يشيله من الويش ليست

  }
}
