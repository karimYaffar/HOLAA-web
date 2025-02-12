import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';

@Component({
    selector: 'app-policies',
    imports: [CommonModule, BreadcrumbComponent, BreadcrumbItemDirective],
    templateUrl: './policies.component.html',
    styleUrl: './policies.component.css'
})
export class PoliciesComponent {

}
