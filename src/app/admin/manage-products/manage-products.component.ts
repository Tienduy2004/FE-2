import {Component, OnInit} from '@angular/core';
import {Product} from "../../product";
import {ProductService} from "../../product.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css'
})
export class ManageProductsComponent implements OnInit{
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProduct().subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      // Sau khi xóa, làm mới danh sách sản phẩm
      this.getProducts();
    });
  }
}
