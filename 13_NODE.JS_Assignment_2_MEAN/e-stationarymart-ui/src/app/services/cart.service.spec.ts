import { TestBed, inject } from '@angular/core/testing';

import { CartService } from './cart.service';
import { CookieService } from 'ngx-cookie-service';

describe('CartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService, CookieService]
    });
  });

  it('should be created', inject([CartService], (service: CartService) => {
    expect(service).toBeTruthy();
  }));
});
