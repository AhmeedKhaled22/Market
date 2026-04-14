import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items.map(item => ({
        ...item,
        quantity: item.quantity ?? 1
      }));
    });
  }

  removeItem(item: any){
    this.cartService.removeFromCart(item);
  }

  increaseQty(item: any){
    this.cartService.updateQuantity(item, 1);
  }

  decreaseQty(item: any){
    this.cartService.updateQuantity(item, -1);
  }

  getTotal(){
    let total = 0;

    this.cartItems.forEach(item => {
      total += (item.price || 0) * (item.quantity || 1);
    });

    return total.toFixed(2);
  }
}
