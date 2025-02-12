import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  originalPrice?: number;
  discount?: number;
  monthlyPayment?: number;
}

@Component({
    selector: 'app-best-sellers',
    imports: [CommonModule],
    templateUrl: './best-sellers.component.html',
    styleUrls: ['./best-sellers.component.css']
})
export class BestSellersComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  products: Product[] = [
    {
      id: 1,
      name: 'VESTIDO MIDI AJUSTADO ESCOTE CORAZÓN CON ABERTURA',
      price: 699,
      originalPrice: 999,
      discount: 30,
      monthlyPayment: 58.25,
      image: 'https://studiofmex.vtexassets.com/arquivos/ids/333173-1000-1071?v=638524372011970000&width=1000&height=1071&aspect=true'
    },
    {
      id: 2,
      name: 'VESTIDO AJUSTADO CON PLISADOS HOMBROS DESCUBIERTOS',
      price: 799,
      originalPrice: 1199,
      discount: 33,
      monthlyPayment: 66.58,
      image: 'https://studiofmex.vtexassets.com/arquivos/ids/368447-1000-1071?v=638676454988930000&width=1000&height=1071&aspect=true'
    },
    {
      id: 3,
      name: 'VESTIDO LARGO AJUSTADO DE TIRAS CON INSU',
      price: 799,
      originalPrice: 1099,
      discount: 27,
      monthlyPayment: 66.58,
      image: 'https://studiofmex.vtexassets.com/arquivos/ids/373849-1000-1071?v=638689272880500000&width=1000&height=1071&aspect=true'
    },
    {
      id: 4,
      name: 'VESTIDO LARGO ASIMÉTRICO CUELLO HALTER',
      price: 1440,
      originalPrice: 1800,
      discount: 20,
      monthlyPayment: 120,
      image: 'https://studiofmex.vtexassets.com/arquivos/ids/373657-1000-1071?v=638689271203000000&width=1000&height=1071&aspect=true'
    }
  ];

  progressDots = [0, 1, 2];
  currentSlide = 0;
  canScrollLeft = false;
  canScrollRight = true;

  ngAfterViewInit() {
    this.checkScrollButtons();
  }

  onScroll() {
    this.checkScrollButtons();
    this.updateCurrentSlide();
  }

  checkScrollButtons() {
    const element = this.scrollContainer.nativeElement;
    this.canScrollLeft = element.scrollLeft > 0;
    this.canScrollRight = element.scrollLeft < (element.scrollWidth - element.clientWidth);
  }

  scroll(direction: 'left' | 'right') {
    const element = this.scrollContainer.nativeElement;
    const scrollAmount = element.clientWidth;
    const scrollTo = direction === 'left' 
      ? element.scrollLeft - scrollAmount 
      : element.scrollLeft + scrollAmount;
    
    element.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
  }

  goToSlide(index: number) {
    const element = this.scrollContainer.nativeElement;
    const scrollAmount = element.clientWidth * index;
    element.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
    this.currentSlide = index;
  }

  updateCurrentSlide() {
    const element = this.scrollContainer.nativeElement;
    this.currentSlide = Math.round(element.scrollLeft / element.clientWidth);
  }
}