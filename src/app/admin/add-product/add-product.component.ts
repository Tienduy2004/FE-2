import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../product.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  productForm !: FormGroup;
  constructor(private  formBuilder: FormBuilder, private productService: ProductService) {
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
  }
  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;
      if (this.productForm.valid) {
        console.log('Form is valid');
        this.productService.addProduct(newProduct).subscribe(() => {
          // Handle success, e.g., navigate to product list page
          console.log('Product added successfully.');
        });
      } else {
        console.log('Form is invalid');
      }

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
