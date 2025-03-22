import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AuthService } from '../../../core/providers/auth.service';
import { FooterService } from '../../../core/providers/footer.service';
import { NavbarService } from '../../../core/providers/navbar.service';
import { UserService } from '../../../core/providers/user.service';
import { AnimatedBackgroundComponent } from '../../../shared/animated-background/animated-background.component';
import { SuccessViewComponent } from '../../../shared/success-view/success-view.component';
import { FormLoginComponent } from '../forms/form-login/form-login.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CarouselModule,
    FormLoginComponent,
    AnimatedBackgroundComponent,
    SuccessViewComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  step = signal<'login' | 'pending' | 'success'>('login');
  token = signal<string | null>(null);

  constructor(
    private readonly navbarService: NavbarService,
    private readonly footerService: FooterService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.step.set(params['step'] || 'login');
      this.token.set(params['token'] || null);
    });

    effect(() => {
      const token = this.token();
      if (token) {
        this.authService.accountVerification(token).subscribe();
      }
    });
  }

  ngOnInit(): void {
    this.navbarService.hide();
    this.footerService.hide();
  }

  ngOnDestroy(): void {
    this.navbarService.show();
    this.footerService.show();
  }

  onRedirect(): void {
    this.authService.forceAuthStateUpdate();
    this.cdr.detectChanges();
    this.router.navigate(['/']);
  }
}
