import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Products } from '../../../core/interfaces/products.interface';
import { ProductsService } from '../../../core/providers/products.service';
import { catchError, map, of, Subject, switchMap } from 'rxjs';
import { AuthService } from '../../../core/providers/auth.service';
import { Router, RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger("slideInOut", [
      transition(":enter", [
        style({ transform: "translateY(-10%)", opacity: 0 }),
        animate("200ms ease-out", style({ transform: "translateY(0)", opacity: 1 })),
      ]),
      transition(":leave", [animate("200ms ease-in", style({ transform: "translateY(-10%)", opacity: 0 }))]),
    ]),
    trigger("dropdownAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-10px)" }),
        animate("200ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
      transition(":leave", [animate("200ms ease-in", style({ opacity: 0, transform: "translateY(-10px)" }))]),
    ]),
  ],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  keyword: string = '';
  isLoading = false;
  isMobileMenuOpen: boolean = false;
  products: Products[] = [];
  totalResults = 0;
  isOpen = false
  isAuthenticated = false;
  showResults = false
  isDropdownOpen = false

  categories = [
    { name: "Ropa", icon: "👚", link: "/categoria/ropa" },
    { name: "Zapatos", icon: "👠", link: "/categoria/zapatos" },
    { name: "Accesorios", icon: "👜", link: "/categoria/accesorios" },
    { name: "Belleza", icon: "💄", link: "/categoria/belleza" },
    { name: "Hogar", icon: "🏠", link: "/categoria/hogar" },
    { name: "Electrónicos", icon: "📱", link: "/categoria/electronicos" },
  ]

  private searchSubject = new Subject<string>();

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly productsService: ProductsService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {    
    this.searchSubject
      .pipe(
        switchMap((keyword) => {
          if (!keyword) {
            this.products = [];
            return of([]); 
          }

          this.isLoading = true;

          return this.productsService.searchProducts(keyword).pipe(
            catchError(() => {
              this.isLoading = false;
              return of([]); 
            }),
          );
        }),
      )
      .subscribe((products) => {
        this.products = products;
        this.showResults = true;
        this.totalResults = products.length;
        this.isLoading = false;
      });

      this.authService.isAuth().subscribe((isAuth) => {
        this.isAuthenticated = isAuth;
      })

  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen
  }

  onSearch() {
    this.searchSubject.next(this.keyword.trim());
  }

  onFocus() {
    if (this.products.length > 0) {
      this.showResults = true
    }
  }

  onBlur() {
    // Delay hiding results to allow for clicking on results
    // setTimeout(() => {
    //   this.showResults = false
    // }, 200)
  }
  
  onProductHover(product: any) {
    // Add pulse animation to hovered product
    const productElement = event?.currentTarget as HTMLElement
    productElement.classList.add("pulse")
    // setTimeout(() => productElement.classList.remove("pulse"), 500)
  }

  onProductLeave() {
    // Remove pulse animation when mouse leaves
  }

  toggleMenu() {
    this.isOpen = !this.isOpen
  }

  closeMenu() {
    this.isOpen = false
  }

  viewProfile() {
    this.closeMenu()
  }

  logout() {
    this.authService.logout().subscribe((response) => {
      console.log(response);
    });

    this.router.navigate(['./login']);

    this.closeMenu()
  }


  

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const menuToggle = document.getElementById('menu-toggle');
      const navbarMenu = document.getElementById('navbar-menu');
      menuToggle?.addEventListener('click', () => {
        navbarMenu?.classList.toggle('hidden');
      });

      const userIcon = document.getElementById('user-icon');
      const modal = document.getElementById('auth-modal');
      const closeModal = document.getElementById('close-modal');

      userIcon?.addEventListener('click', () => {
        modal?.classList.remove('hidden');
      });

      closeModal?.addEventListener('click', () => {
        modal?.classList.add('hidden');
      });
    }
  }
}
