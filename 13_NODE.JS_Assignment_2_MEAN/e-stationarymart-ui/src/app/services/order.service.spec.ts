import { TestBed, inject } from '@angular/core/testing';

import { OrderService } from './order.service';
import { CartService } from './cart.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

describe('OrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService, CartService, CookieService],
      imports: [
        HttpClientModule,
      ]
    });
  });

  it('should be created', inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));
});
