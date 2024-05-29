import {Component, inject, OnInit} from '@angular/core';
import {ListProductsComponent} from "../list-products/list-products.component";
import {CommonModule} from "@angular/common";
import {Product} from "../product";
import {ProductService} from "../product.service";
import {AboutComponent} from "../about/about.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListProductsComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.scss'
})
export class HomeComponent {



}
