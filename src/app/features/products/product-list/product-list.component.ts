import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HotToastService } from '@ngneat/hot-toast';
import { Product } from '../../../core/interfaces/products.interface';
import { SubCategory } from '../../../core/interfaces/sub-category.interface';
import { AuthService } from '../../../core/providers/auth.service';
import { CartService } from '../../../core/providers/cart.service';
import { ProductsService } from '../../../core/providers/products.service';
import { SubCategoryService } from '../../../core/providers/sub-category.service';
import { ProductCardComponent } from '../ui/product-card/product-card.component';
import { FilterSubCategoryComponent } from '../ui/filters/filter-subcategory.component';
import { FilterPriceComponent } from '../ui/filters/filter-price.component';
import { FilterSizesComponent } from '../ui/filters/filter-sizes.component';
import { Size } from '../../../core/interfaces/size.interface';
import { SizeService } from '../../../core/providers/size.service';
import { FilterColorsComponent } from '../ui/filters/filter-colors.component';
import { ColorService } from '../../../core/providers/color.service';
import { Color } from '../../../core/interfaces/color.interface';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProductCardComponent,
    FilterSubCategoryComponent,
    FilterPriceComponent,
    FilterSizesComponent,
    FilterColorsComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  subCategories: SubCategory[] = [];
  sizes: Size[] = [];
  colors: Color[] = [];

  category = '';

  selectedSubCategory = '';
  selectedSize = '';
  selectColor = '';

  maxPrice = 0.0;
  minPrice = 0.0;

  isLoading = true;

  // Paginación
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly toast: HotToastService,
    private readonly productsService: ProductsService,
    private readonly subCategoryService: SubCategoryService,
    private readonly cartService: CartService,
    private readonly sizeService: SizeService,
    private readonly colorService: ColorService,
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.category = params['category'];
      this.loadProductsByCategory(this.category);
      this.loadSubCategoriesByCategory(this.category);
    });
    this.loadSizes();
    this.loadColors();
  }

  onSelectedSubCategory(subCategory: string) {
    this.selectedSubCategory = subCategory;
    this.filteredProduct();
  }

  onChangeMaxPrice(max: number) {
    this.maxPrice = max;
    this.filteredProduct();
  }

  onChangeMinPrice(min: number) {
    this.minPrice = min;
    this.filteredProduct();
  }

  onSelectedSize(size: string) {
    this.selectedSize = size;
    this.filteredProduct();
  }

  onSelectedColor(color: string) {
    this.selectColor = color;
    this.filteredProduct();
  }

  async loadProductsByCategory(category: string) {
    this.isLoading = true;
    this.productsService
      .getProductsByCategory(category)
      .subscribe((products) => {
        this.products = products;
        this.isLoading = false;
      });
  }

  async loadSubCategoriesByCategory(category: string) {
    this.subCategoryService
      .getSubCategoriesByCategory(category)
      .subscribe((subCategories) => {
        this.subCategories = subCategories;
      });
  }

  async loadSizes() {
    this.sizeService.getSizes().subscribe((sizes) => {
      this.sizes = sizes;
    });
  }

  async loadColors() {
    this.colorService.getColors().subscribe((colors) => {
      this.colors = colors;
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
        this.selectColor,
      )
      .subscribe((products) => {
        this.products = products;
        this.currentPage = 1;
      });
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPaginationRange(): number[] {
    const range = [];
    const maxVisiblePages = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(this.totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }

  onAdd(productCode: string) {
    if (!this.authService.isAuthenticate()) {
      this.router.navigate(['auth/login']);
    } else {
      this.cartService
        .addProductToCart({ productCode: productCode, quantity: 1 })
        .subscribe((response) => {
          this.toast.success(response.message, {
            position: 'top-right',
          });
        });
    }
  }
}
