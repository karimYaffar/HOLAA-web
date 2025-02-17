import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-contacts',
    imports: [CommonModule, FormsModule],
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  submitForm() {
    console.log('Datos del formulario:', this.contactForm);
    alert('Formulario enviado correctamente');
  }
}
