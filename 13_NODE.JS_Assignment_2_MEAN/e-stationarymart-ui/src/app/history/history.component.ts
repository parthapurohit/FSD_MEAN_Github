import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  orderHistory: any;

  orderCart = {};

  constructor(private orderService: OrderService, private cartService: CartService) { }

  ngOnInit() {
    this.getHistory();
    setInterval(() => {
      this.getHistory();
    }, 10000);
  }

  getHistory() {
    this.orderService.orderHistory().subscribe(history => {
      this.orderHistory = history;
      for (const item of this.orderHistory) {
        this.getOrderCart(item.id);
      }
    });
  }

  getOrderCart(id) {
    this.orderService.orderCart(id).subscribe(data => {
      this.orderCart[id] = data;
    });
  }

  getOrder(id) {
    return this.orderCart[id];
  }

  cancelOrder(id) {
    this.orderService.cancelOrder(id).subscribe(data => {
      this.getHistory();
    });
  }

  modifyOrder(id) {
    this.orderService.modifyOrder(id).subscribe(data => {
      this.cartService.loadToCart(data);
      this.getHistory();
    });
  }
}
