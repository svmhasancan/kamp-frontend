import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
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
    private activatedRoute: ActivatedRoute
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
}
