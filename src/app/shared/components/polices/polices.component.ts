import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-polices',
  standalone: true,
  imports: [],
  templateUrl: './polices.component.html',
  styleUrl: './polices.component.css'
})
export class PolicesComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
