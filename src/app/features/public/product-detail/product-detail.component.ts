import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
    selector: "app-product-detail",
    imports: [CommonModule],
    templateUrl: "./product-detail.component.html",
    styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {
  product = {
    code: "P001",
    name: "Vestido Mini con Olanes y Estampado Floral Negro",
    imgUri: [
      "https://highstreet.com.mx/cdn/shop/files/HIGH-STREET-Vestido-maxi-satinado-cruzado-de-un-hombro-dcca-230114_01_4829b10c-4f42-45d9-a26f-d4abf2ae6ed8_720x.jpg?v=1737402174",
      "https://highstreet.com.mx/cdn/shop/files/HIGH-STREET-Vestido-maxi-satinado-cruzado-de-un-hombro-dcca-230114_02_dc9d9877-aaf8-49b1-9aa3-78d55affd7c5_720x.jpg?v=1737402174",
      "https://highstreet.com.mx/cdn/shop/files/HIGH-STREET-Vestido-maxi-satinado-cruzado-de-un-hombro-dcca-230114_03_d4a76555-0b98-4392-aa44-8f7770eb1f68_720x.jpg?v=1737402174",
      "https://highstreet.com.mx/cdn/shop/files/HIGH-STREET-Vestido-maxi-satinado-cruzado-de-un-hombro-dcca-230114_04_a500157c-72f2-4652-bbaf-79214fa2f82d_720x.jpg?v=1737402174",
    ],
    description: "Modelo: 1,73 cms de altura y talla CH. 93% Viscosa, 3% Lino.",
    price: 299.0,
    stock: 15,
    size: ["CH - S", "MD - M", "GD - L", "XGD - XL"],
    colors: ["#000000", "#FFFFFF", "#808080"],
  }

  selectedImage: string = ""
  selectedSize: string | null = null
  selectedColor: string | null = null

  ngOnInit() {
    this.selectedImage = this.product.imgUri[0]
  }

  selectImage(image: string) {
    this.selectedImage = image
  }

  selectSize(size: string) {
    this.selectedSize = size
  }

  selectColor(color: string) {
    this.selectedColor = color
  }
}

