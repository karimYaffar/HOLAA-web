import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-internal-server-error',
    imports: [],
    templateUrl: './page-internal-server-error.component.html',
    styleUrl: './page-internal-server-error.component.css'
})
export class PageInternalServerErrorComponent {
  constructor(private readonly router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
