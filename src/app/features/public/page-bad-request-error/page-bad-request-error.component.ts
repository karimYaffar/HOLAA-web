import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-bad-request-error',
  standalone: true,
  imports: [],
  templateUrl: './page-bad-request-error.component.html',
  styleUrl: './page-bad-request-error.component.css',
})
export class PageBadRequestErrorComponent {
  constructor(private readonly router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
