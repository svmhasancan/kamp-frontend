import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filterText = '';
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const categoryId = params.get('categoryID');

      if (categoryId) {
        this.getProductsByCategoryId(categoryId);
      } else {
        this.getProducts();
      }
    });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
    });
  }

  getProductsByCategoryId(id: string): void {
    this.productService.getProductsByCategoryId(id).subscribe((response) => {
      this.products = response.data;
    });
  }

  addToCart(product: Product) {
    this.toastrService.success('Sepete Eklendi', product.productName);
    this.cartService.addToCart(product);
  }
}
