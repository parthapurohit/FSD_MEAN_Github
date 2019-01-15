import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart = [];

  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) { }

  ngOnInit() { this.getCartItems(); }

  getCartItems() {
    this.cart = [];
    const tempCart = this.cartService.cart;
    for (const prop of Object.keys(tempCart)) {
      this.cart.push(tempCart[prop]);
    }
  }

  addToCart(qty: number, item: any) {
    this.cartService.addToCart({ item: item, qty: +qty });
    this.getCartItems();
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item.id);
    this.getCartItems();
  }

  calcTotalPrice(): number {
    return this.cartService.calcTotalPrice();
  }

  placeOrder() {
    this.orderService.placeOrder().subscribe(data => {
      this.cartService.clearCart();
      this.router.navigate(['/history']);
    });
  }

}
