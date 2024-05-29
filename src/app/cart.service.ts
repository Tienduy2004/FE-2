import { Injectable } from '@angular/core';
import {Product} from "./product";
import {BehaviorSubject} from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // private readonly cartCookieKey = 'cart';

  constructor(private cookieService: CookieService) {}

  addToCart(productId: string): void {
    this.cookieService.set(productId,"1");
  }
  deleteProductCookie(productId: number): void {
    this.cookieService.delete(productId.toString());
  }


}
