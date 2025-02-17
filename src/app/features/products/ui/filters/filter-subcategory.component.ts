import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SubCategory } from '../../../../core/interfaces/sub-category.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'filter-subcategory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<div class="mb-4">
    <select
      [(ngModel)]="selectValue"
      (change)="onSelect()"
      class="w-full border rounded px-3 py-2 text-sm"
    >
      <option value="">Todos los {{ categoryName }}</option>
      @for(subCategory of subCategories; track subCategory.name) {
          <option [value]="subCategory.name">
          {{ subCategory.name }}
        </option>
      }
    </select>
  </div>`,
})
export class FilterSubCategoryComponent {
  @Input({ required: true }) categoryName!: string;
  @Input({ required: true }) subCategories!: SubCategory[];
  @Output() selectedSubCategory = new EventEmitter<string>();

  selectValue: string = '';

  onSelect() {
    this.selectedSubCategory.emit(this.selectValue);
  }
}
