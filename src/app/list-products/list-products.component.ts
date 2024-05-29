import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../product";
import {CommonModule} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {ProductService} from "../product.service";
import {CartService} from "../cart.service";


@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './list-products.component.html',
  styleUrl: './styleListProduct.scss'
})
export class ListProductsComponent implements OnInit{
  @Input() product !: Product;
  productList: Product[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct(): void {
    this.productService.getAllProduct().subscribe((data) => {
      this.productList = data;
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllProduct();
  }
  addToCart(productId: number): void {
    let stringValue: string = productId.toString();
    this.cartService.addToCart(stringValue);
  }
  // onTableSizeChange(event: any) {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.getAllProduct();
  // }


}
