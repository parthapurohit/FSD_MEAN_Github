import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  item: any;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    this.getProductById();
  }

  getProductById() {
    this.item = this.route.snapshot.data.item;
  }

  addToCart(qty: number) {
    this.cartService.addToCart({ item: this.item, qty: +qty });
  }

  checkout() {
    this.addToCart(1);
    this.router.navigate(['/cart']);
  }
}
