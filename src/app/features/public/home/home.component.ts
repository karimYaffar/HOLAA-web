import { Component } from '@angular/core';
import { BestSellersComponent } from "../../../shared/best-sellers/best-sellers.component";
import { SliderComponent } from '../../../shared/slider/slider.component';
import { PromotionalBannerComponent } from '../ui/promotional-banner/promotional-banner.component';
import { ServiceFeaturesComponent } from '../ui/service-features/service-features.component';
@Component({
    selector: 'app-home',
    imports: [
    PromotionalBannerComponent,
    ServiceFeaturesComponent,
    SliderComponent,
],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {}
