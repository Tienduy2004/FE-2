import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../product";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements  OnInit{
  productForm !: FormGroup;
  productId: number = 0;
  product !: Product;

  constructor(private  formBuilder: FormBuilder, private productService: ProductService, private route: ActivatedRoute) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? +idParam : 0;
  }
  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
      rating: [0, Validators.min(0)],
      quantity: [0, Validators.min(0)]
    });
    this.getProduct();
  }
  getProduct(): void {
    this.productService.getProductById(this.productId).subscribe(products => {
      this.product = products;
      this.setFormValues();
    });
  }
  setFormValues(): void {
    this.productForm.setValue({
      name: this.product?.name || '',
      description: this.product?.description || '',
      price: this.product?.price || 0,
      imageUrl: this.product?.imageUrl || '',
      rating: this.product?.rating || 0,
      quantity: this.product?.quantity || 0
    });
  }
  onSubmit(): void {
    console.log(this.productForm);
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;
      newProduct.id = this.productId; // Thêm id vào dữ liệu trước khi gửi

      this.productService.UpdateProduct(newProduct).subscribe(() => {
        console.log('Product added or updated successfully.');
        // Redirect hoặc thực hiện các hành động khác sau khi gửi dữ liệu
      });
    } else {
      console.log('Form is invalid');
    }
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({
        imageUrl: file
      });
    }
  }

}
