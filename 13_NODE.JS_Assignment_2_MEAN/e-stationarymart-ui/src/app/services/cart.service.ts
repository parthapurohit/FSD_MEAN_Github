import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cart = {};
  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private cookieService: CookieService) {
    this.messageSource.next(this.cartItemsLength);
  }

  get cart(): any {
    const temp = this.cookieService.get('Cart') || '{}';
    this._cart = JSON.parse(temp);
    return this._cart;
  }

  set cart(theCart: any) {
    this._cart = theCart;
    this.cookieService.set('Cart', JSON.stringify(this._cart));
  }

  get cartItemsLength(): number {
    return Object.keys(this.cart).length;
  }

  addToCart(ele) {
    const temp = this.cart;

    if (ele.item.id in this.cart) {
      temp[ele.item.id].qty += ele.qty;
    } else {
      temp[ele.item.id] = ele;
    }

    this.cart = temp;
    this.messageSource.next(this.cartItemsLength);
  }

  loadToCart(data) {
    for (const prod of data) {
      this.addToCart({
        item: {
          description: prod.description,
          id: prod.id,
          image: prod.image,
          name: prod.name,
          price: prod.price,
        },
        qty: prod.qty,
      });
    }
  }

  removeFromCart(id) {
    const temp = this.cart;
    temp[id].qty -= 1;
    if (temp[id].qty <= 0) {
      delete temp[id];
    }
    this.cart = temp;
    this.messageSource.next(this.cartItemsLength);
  }

  calcTotalPrice(): number {
    let totalPrice = 0;
    for (const cartItem of Object.keys(this.cart)) {
      totalPrice += this.cart[cartItem].item.price * this.cart[cartItem].qty;
    }
    return totalPrice;
  }

  clearCart() {
    this.cart = {};
    this.messageSource.next(this.cartItemsLength);
  }
}
