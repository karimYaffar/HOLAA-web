import { CommonModule } from "@angular/common"
import { Component, type OnInit } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"

import  { Products } from "../../../core/interfaces/products.interface"
import  { ProductsService } from "../../../core/providers/products.service"
import { BreadcrumbComponent, BreadcrumbItemDirective } from "xng-breadcrumb"
import  { SubCategory } from "../../../core/interfaces/sub-category.interface"
import  { SubCategoryService } from "../../../core/providers/sub-category.service"

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, BreadcrumbComponent, BreadcrumbItemDirective],
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent implements OnInit {
  category = ""
  selectedSubCategory = ""
  selectedSize = ""
  selectColor = ""
  maxPrice = 0.0
  minPrice = 0.0
  products: Products[] = []
  subCategories: SubCategory[] = []
  isLoading = true // Nuevo estado para manejar la carga

  // Paginación
  currentPage = 1
  itemsPerPage = 12

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService,
    private readonly subCategoryService: SubCategoryService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category = params["category"]
      this.loadProductsByCategory(this.category)
      this.loadSubCategoriesByCategory(this.category)
    })
  }

  async loadProductsByCategory(tipo: string) {
    this.isLoading = true
    try {
      this.productsService.getProductsByCategory(tipo).subscribe((products) => {
        this.products = products.map((product) => ({
          ...product,
          price: this.cleanPrice(product.price), // Limpiamos el precio
        }))
      })
    } finally {
      this.isLoading = false
    }
  }

  // Función para limpiar el precio
  private cleanPrice(price: any): number {
    if (typeof price === "string") {
      return Number(price.replace(/[^0-9.-]+/g, ""))
    }
    return price
  }

  async loadSubCategoriesByCategory(category: string) {
    this.subCategoryService.getSubCategoriesByCategory(category).subscribe((subCategories) => {
      this.subCategories = subCategories
    })
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
        this.products = products
        this.currentPage = 1 // Reset to first page when applying filters
      })
  }

  get paginatedProducts(): Products[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    return this.products.slice(startIndex, startIndex + this.itemsPerPage)
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage)
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
    }
  }

  getPaginationRange(): number[] {
    const range = []
    const maxVisiblePages = 5
    let start = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2))
    const end = Math.min(this.totalPages, start + maxVisiblePages - 1)

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }

    for (let i = start; i <= end; i++) {
      range.push(i)
    }

    return range
  }
}
