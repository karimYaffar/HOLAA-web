import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';

@Component({
    selector: 'app-about-us',
    imports: [BreadcrumbComponent, BreadcrumbItemDirective, CommonModule],
    templateUrl: './about-us.component.html'
})
export class AboutUsComponent {
  
}
