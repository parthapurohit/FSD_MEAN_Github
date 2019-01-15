import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  addToCart(qty: number, item: any) {
    this.cartService.addToCart({ item: item, qty: +qty });
  }

  checkout(item: any) {
    this.addToCart(1, item);
    this.router.navigate(['/cart']);
  }
}
