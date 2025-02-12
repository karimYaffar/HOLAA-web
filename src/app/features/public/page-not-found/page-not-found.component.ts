import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-page-not-found',
    imports: [RouterLink],
    templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent {

  constructor(private readonly router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }

}
