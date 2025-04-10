import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  currentCategory: Category = { categoryId: 0, categoryName: '' };

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }

  setCurrentCategory(category: Category): void {
    this.currentCategory = category;
    this.router.navigate([
      'products',
      'category',
      (category as any).categoryID,
    ]);
  }

  setClassNameOfCurrentCategory(category: Category): string {
    return category === this.currentCategory
      ? 'list-group-item active'
      : 'list-group-item';
  }

  resetCategoryFilters(): void {
    this.currentCategory = { categoryId: 0, categoryName: '' };
  }
}
