import { Component, OnInit } from '@angular/core';
import { PromotionalBannerComponent } from '../../../shared/promotional-banner/promotional-banner.component';
import { ServiceFeaturesComponent } from '../../../shared/service-features/service-features.component';
import { SliderCategoriesComponent } from '../../../shared/slider-categories/slider-categories.component';
import { BestSellersComponent } from '../../../shared/best-sellers/best-sellers.component';
import { ProductDetailComponent } from '../../../features/public/product-detail/product-detail.component';
import { AuthService } from '../../../core/providers/auth.service';
import { catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PromotionalBannerComponent,
    ServiceFeaturesComponent,
    SliderCategoriesComponent,
    BestSellersComponent,
    ProductDetailComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {}
