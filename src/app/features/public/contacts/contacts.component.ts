import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputControlComponent } from "../../../shared/ui/form-input-control/form-input-control.component";
import { ButtonControlComponent } from "../../../shared/ui/button/button-control.component";
import { FormTextAreaControlComponent } from "../../../shared/ui/form-text-area-control/form-text-area-control.component";
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
    selector: 'form-contacts',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputControlComponent, ButtonControlComponent, FormTextAreaControlComponent],
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.css',
    animations: [
      trigger('fadeInOut', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('300ms', style({ opacity: 1 })),
        ]),
        transition(':leave', [
          animate('300ms', style({ opacity: 0 })),
        ]),
      ]),
    ],
})
export class ContactsComponent {
  contactForm!: FormGroup;

  isSubmitting = false;
  submitSuccess = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toast: HotToastService,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // TODO Falta por implementar envio de datos
  submitForm() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      // Simular envío de formulario
      setTimeout(() => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();
        this.toast.success('Gracias por contactarnos. Te responderemos pronto.', {
          position: 'top-right'
        })
        setTimeout(() => this.submitSuccess = false, 5000); 
      }, 2000);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
