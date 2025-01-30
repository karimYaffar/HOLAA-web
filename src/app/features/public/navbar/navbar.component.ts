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
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  keyword: string = '';
  isLoading = false;
  isMobileMenuOpen: boolean = false;
  products: Products[] = [];
  totalResults = 0;
  isOpen = false
  isLogged = false;

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
        this.totalResults = products.length;
        this.isLoading = false;
      });

      this.authService.isAuth().subscribe((isAuth) => {
        this.isLogged = isAuth;
      })

  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onSearch() {
    this.searchSubject.next(this.keyword.trim());
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
