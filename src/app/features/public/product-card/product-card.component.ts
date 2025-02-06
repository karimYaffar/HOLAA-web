import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../../core/interfaces/products.interface';
import { ProductsService } from '../../../core/providers/products.service';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { SubCategory } from '../../../core/interfaces/sub-category.interface';
import { SubCategoryService } from '../../../core/providers/sub-category.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BreadcrumbComponent,
    BreadcrumbItemDirective
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  category: string = '';
  selectedSubCategory: string = '';
  selectedSize: string = '';
  selectColor: string = '';
  maxPrice: number = 0.0;
  minPrice: number = 0.0;
  products: Products[] = [];
  subCategories: SubCategory[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService,
    private readonly subCategoryService: SubCategoryService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.loadProductsByCategory(this.category);
      this.loadSubCategoriesByCategory(this.category);
    });
  }

  async loadProductsByCategory(tipo: string) {
    this.productsService.getProductsByCategory(tipo).subscribe((products) => {
      this.products = products;
    });
  }

  async loadSubCategoriesByCategory(category: string) {
    this.subCategoryService
      .getSubCategoriesByCategory(category)
      .subscribe((subCategories) => {
        this.subCategories = subCategories;
      });
  }

  async filteredProduct() {
    this.productsService
      .getFilteredProducts(
      this.category,
      this.selectedSubCategory, 
      this.selectedSize,
      this.minPrice,
      this.maxPrice, 
      this.selectColor
    )
      .subscribe((products) => {
        this.products = products;
      });
  }
}
