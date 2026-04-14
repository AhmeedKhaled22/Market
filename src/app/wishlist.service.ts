import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private storageKey = 'wishlist';

  private wishlistItems = new BehaviorSubject<any[]>(this.loadFromStorage());
  wishlistItems$ = this.wishlistItems.asObservable();

  private wishlistCount = new BehaviorSubject<number>(this.loadFromStorage().length);
  wishlistCount$ = this.wishlistCount.asObservable();

  private loadFromStorage(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(items: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  addToWishlist(product: any) {
    const items = [...this.wishlistItems.value, product];

    this.wishlistItems.next(items);
    this.wishlistCount.next(items.length);

    this.saveToStorage(items);
  }

  removeFromWishlist(item: any) {
    const items = this.wishlistItems.value.filter(i => i.id !== item.id);

    this.wishlistItems.next(items);
    this.wishlistCount.next(items.length);

    this.saveToStorage(items);
  }
}
