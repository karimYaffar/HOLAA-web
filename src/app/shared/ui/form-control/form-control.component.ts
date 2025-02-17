import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
  <div [formGroup]="form" class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="relative">
      <span
        class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
        [class]="iconClass"
      ></span>
      <input
        formControlName="{{ controlName }}"
        [type]="type"
        class="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-[#E91E63] focus:border-[#E91E63] transition-colors duration-300"
        [class.border-red-300]="isInvalid"
        [placeholder]="placeholder"
        (input)="onInputChange($event)"
      />
    </div>
    <div *ngIf="isInvalid" class="text-red-500 text-sm mt-1 animate-fade-in">
      {{ errorMessage }}
    </div>
  </div>`,
  styles: `:host {
    display: block;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }`,
})
export class FormControlComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) iconClass!: string;
  @Input({ required: true }) errorMessage!: string;
  @Input({ required: true }) placeholder!: string;
  @Input() type = 'text';

  @Output() valueChange = new EventEmitter<string>();

  get control() {
    return this.form?.get(this.controlName);
  }

  get isInvalid() {
    return this.control?.invalid && this.control?.touched;
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }
}
