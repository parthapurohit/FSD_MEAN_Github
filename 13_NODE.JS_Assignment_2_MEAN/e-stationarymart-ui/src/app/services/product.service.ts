import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get('http://localhost:3000/api/products');
  }

  getProductById(id: string) {
    return this.http.get(`http://localhost:3000/api/product/${id}`);
  }

}
