import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'cart_items';

  private cartItemsSubject = new BehaviorSubject<any[]>(this.getCart());
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.updateCount();
  }

  // ================= GET CART =================
  private getCart(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // ================= SAVE CART =================
  private saveCart(items: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.cartItemsSubject.next(items);
    this.updateCount();
  }

  // ================= ADD =================
  addToCart(product: any) {
    const items = this.getCart();

    const existing = items.find(i => i.id === product.id);

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }

    this.saveCart(items);
  }

  // ================= REMOVE =================
  removeFromCart(item: any) {
    let items = this.getCart();
    items = items.filter(i => i.id !== item.id);

    this.saveCart(items);
  }

  // ================= UPDATE QUANTITY =================
  updateQuantity(item: any, change: number) {
    const items = this.getCart();

    const target = items.find(i => i.id === item.id);

    if (target) {
      target.quantity = (target.quantity || 1) + change;

      if (target.quantity < 1) {
        target.quantity = 1;
      }
    }

    this.saveCart(items);
  }

  // ================= COUNT (FIXED) =================
  private updateCount() {
    const items = this.getCart();

    const totalQty = items.reduce((sum, item) => {
      return sum + (item.quantity || 1);
    }, 0);

    this.cartCountSubject.next(totalQty);
  }

  // ================= CLEAR =================
  clearCart() {
    this.saveCart([]);
  }
}
