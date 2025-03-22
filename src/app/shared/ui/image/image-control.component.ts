import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnpicImageDirective } from '@unpic/angular';

@Component({
  selector: 'image-control',
  standalone: true,
  imports: [UnpicImageDirective, CommonModule],
  template: `<img unpic [src]="src ? src : ''" [alt]="alt" [ngClass]="imageClass" />`,
})
export class ImageControlComponent {
  @Input({ required: true }) src: string | null = '';
  @Input({ required: true }) alt: string = '';
  @Input({ required: true }) imageClass: string = '';
}
