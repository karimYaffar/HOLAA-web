import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_IMAGE } from '../../constants/constants';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { CarouselModule, OwlOptions,  } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../core/providers/category.service';

@Component({
  selector: 'app-slider-categories',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './slider-categories.component.html',
  styleUrl: './slider-categories.component.css',
  animations: [
    trigger('slideAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SliderCategoriesComponent {
  categories = [
    { name: 'Tops', image: `${PATH_IMAGE}/top_category.webp` },
    { name: 'Vestidos', image: `${PATH_IMAGE}/vestido_category.webp` },
    { name: 'Pantalones', image: `${PATH_IMAGE}/jeans_category.webp` },
    { name: 'Interior', image: `${PATH_IMAGE}/interior_category.webp` },
    { name: 'Faldas', image: `${PATH_IMAGE}/falda_category.webp` },
  ];

  carouselOptions: OwlOptions = {
    loop: true,
    lazyLoad: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1024: {
        items: 3,
      },
    },
    nav: false,
    rewind: true,
    autoplay: true,
    autoplaySpeed: 8000,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    slideTransition: 'linear' 
  };

  @ViewChild('owlCarousel', { static: false }) owlCarousel: any;


  constructor(
    private readonly router: Router
  ) {}

  currentIndex = 0;
  autoPlayInterval: any;
  totalSlides = this.categories.length;

  redirectToProduct(tipoName: string) {
    this.router.navigate(['/productos', tipoName.toLowerCase()]);
  }
  
  next() {
    if (this.owlCarousel) {
      this.owlCarousel.next();
    }
  }

  prev() {
    if (this.owlCarousel) {
      this.owlCarousel.prev();
    }
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
