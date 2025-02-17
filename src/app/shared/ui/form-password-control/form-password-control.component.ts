import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-password-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: ` <div [formGroup]="form" class="space-y-2">
    <label class="block text-sm font-medium text-gray-700"> {{ label }} </label>
    <div class="relative">
      <span
        class="absolute left-3 top-1/2 transform -translate-y-1/2 icon-[mdi--key-outline] w-5 h-5 text-gray-500"
      ></span>
      <input
        [type]="showPassword ? 'text' : 'password'"
        [formControlName]="controlName"
        autocomplete="current-password"
        class="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-lg focus:ring-[#E91E63] focus:border-[#E91E63] transition-colors duration-300"
        [class.border-red-300]="isInvalid"
        [placeholder]="placeholder"
        (focus)="showRequirements = true"
        (blur)="showRequirements = false"
        (input)="checkPasswordStrength()"
      />
      <button
        type="button"
        (click)="toggle()"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#E91E63] transition-colors duration-300"
      >
        <span
          [class.icon-[mdi--eye-outline]]="!showPassword"
          [class.icon-[mdi--eye-off-outline]]="showPassword"
          class="w-5 h-5"
        ></span>
      </button>
    </div>
    <div
      *ngIf="form.get(controlName)?.invalid && form.get(controlName)?.touched"
      class="text-red-500 text-sm mt-1 animate-fade-in"
    >
      {{ errorMessage }}
    </div>
    <ng-container *ngIf="enableRequirements">
      <div
        *ngIf="showRequirements"
        class="absolute z-10 w-72 p-4 mt-2 bg-white border rounded-lg shadow-lg transition-opacity duration-200"
        [class.opacity-100]="showRequirements"
        [class.opacity-0]="!showRequirements"
      >
        <h4 class="font-medium text-sm mb-2">La contraseña debe contener:</h4>
        <ul class="space-y-2 text-sm">
          <li class="flex items-center space-x-2">
            <span
              [class.text-green-500]="requirements.length"
              [class.text-red-500]="!requirements.length"
            >
              {{ requirements.length ? '✓' : '×' }}
            </span>
            <span
              [class.text-green-500]="requirements.length"
              [class.text-gray-600]="!requirements.length"
            >
              8-20 caracteres
            </span>
          </li>
          <li class="flex items-center space-x-2">
            <span
              [class.text-green-500]="requirements.lowercase"
              [class.text-red-500]="!requirements.lowercase"
            >
              {{ requirements.lowercase ? '✓' : '×' }}
            </span>
            <span
              [class.text-green-500]="requirements.lowercase"
              [class.text-gray-600]="!requirements.lowercase"
            >
              Al menos una minúscula
            </span>
          </li>
          <li class="flex items-center space-x-2">
            <span
              [class.text-green-500]="requirements.uppercase"
              [class.text-red-500]="!requirements.uppercase"
            >
              {{ requirements.uppercase ? '✓' : '×' }}
            </span>
            <span
              [class.text-green-500]="requirements.uppercase"
              [class.text-gray-600]="!requirements.uppercase"
            >
              Al menos una mayúscula
            </span>
          </li>
          <li class="flex items-center space-x-2">
            <span
              [class.text-green-500]="requirements.number"
              [class.text-red-500]="!requirements.number"
            >
              {{ requirements.number ? '✓' : '×' }}
            </span>
            <span
              [class.text-green-500]="requirements.number"
              [class.text-gray-600]="!requirements.number"
            >
              Al menos un número
            </span>
          </li>
          <li class="flex items-center space-x-2">
            <span
              [class.text-green-500]="requirements.special"
              [class.text-red-500]="!requirements.special"
            >
              {{ requirements.special ? '✓' : '×' }}
            </span>
            <span
              [class.text-green-500]="requirements.special"
              [class.text-gray-600]="!requirements.special"
            >
              Al menos un carácter especial ($!%*?&)
            </span>
          </li>
        </ul>
      </div>
    </ng-container>
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
export class FormPasswordControlComponent implements OnInit {
  showPassword: boolean = false;
  showRequirements: boolean = false;
  requirements = {
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  };

  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) errorMessage!: string;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) enableRequirements: boolean = false;

  ngOnInit() {
    this.form.get(this.controlName)?.valueChanges.subscribe(() => {
      this.checkPasswordStrength();
    });
  }

  toggle(): void {
    this.showPassword = !this.showPassword;
  }

  get control() {
    return this.form?.get(this.controlName);
  }

  get isInvalid() {
    return this.control?.invalid && this.control?.touched;
  }

  checkPasswordStrength() {
    const password = this.form.get('password')?.value;

    this.requirements = {
      length: password.length >= 8 && password.length <= 20,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
    };
  }
}
