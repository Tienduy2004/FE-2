import { Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {CartService} from "../cart.service";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {Product} from "../product";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cart: Product[] = [];
  decreaseQuantity(input: HTMLInputElement): void {
    let currentValue = parseInt(input.value, 10);

    if (currentValue > 1) {
      input.value = (currentValue - 1).toString();
    }
  }

  increaseQuantity(input: HTMLInputElement): void {
    let currentValue = parseInt(input.value, 10);

    if (currentValue < 100) {
      input.value = (currentValue + 1).toString();
    }
  }
  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    // const productIds = this.cartService.getCart();
    this.getAllCart();

  }
  getAllCart(){
    this.productService.getProductsFromCart().subscribe(data =>{
      this.cart =data;
    })
  }
  // Hàm xóa cookie dựa trên product.id
  deleteToCart(productId: number): void {
    this.cartService.deleteProductCookie(productId);
    this.getAllCart();
  }

}
