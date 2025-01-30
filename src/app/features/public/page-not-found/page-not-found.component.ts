import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent {

  constructor(private readonly router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }

}
