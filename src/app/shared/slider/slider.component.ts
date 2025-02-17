import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { PATH_IMAGE } from '../../core/constants/constants';
import { ItemSliderComponent } from '../item-slider/item-slider.component';

@Component({
  selector: 'slider-categories',
  imports: [CommonModule, CarouselModule, ItemSliderComponent],
  template: `<section class="relative mx-auto px-4">
    <owl-carousel-o #owlCarousel [options]="carouselOptions">
      @for (category of categories; track category.id;) {
      <ng-template
        carouselSlide
        [id]="trackByFn(categories.indexOf(category), categories)"
      >
        <item-slider
          [category]="category"
          (onSelectedCategory)="redirectToProduct($event)"
        />
      </ng-template>
      }
    </owl-carousel-o>

    <button
      (click)="prev()"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
    >
      <span class="icon-[hugeicons--arrow-left-01] w-12 h-12 bg-black"></span>
    </button>

    <button
      (click)="next()"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
    >
      <span class="icon-[hugeicons--arrow-right-01] w-12 h-12 bg-black"></span>
    </button>
  </section> `,
  animations: [
    trigger('slideAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SliderComponent {
  categories = [
    { id: 'top-1', name: 'Tops', image: `${PATH_IMAGE}/top_category.webp` },
    {
      id: 'vestido-2',
      name: 'Vestidos',
      image: `${PATH_IMAGE}/vestido_category.webp`,
    },
    {
      id: 'pantalon-3',
      name: 'Pantalones',
      image: `${PATH_IMAGE}/jeans_category.webp`,
    },
    {
      id: 'interior-4',
      name: 'Interiores',
      image: `${PATH_IMAGE}/interior_category.webp`,
    },
    {
      id: 'falda-5',
      name: 'Faldas',
      image: `${PATH_IMAGE}/falda_category.webp`,
    },
  ];

  currentIndex = 0;
  autoPlayInterval: any;
  totalSlides = this.categories.length;

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
    slideTransition: 'linear',
  };

  @ViewChild('owlCarousel', { static: false }) owlCarousel: any;

  constructor(private readonly router: Router) {}

  redirectToProduct(category: string): any {
    this.router.navigate(['/products', category.toLowerCase()]);
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

  trackByFn(index: number, item: any): string {
    return `${item.name}-${index}`;
  }
}
