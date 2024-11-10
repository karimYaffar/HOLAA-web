import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PrivacyDocument {
  id: number;
  title: string;
  content: string;
  effective_date?: Date;
  status?: 'deleted' | 'active'; // Nueva propiedad de estado
  version: string;
  create_date: Date;
  update_date: Date;
}

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
})

export class PrivacyComponent {
  documents: PrivacyDocument[] = [
    {
      id: 1,
      title: 'Política',
      content: 'Este documento describe cómo manejamos su privacidad...',
      effective_date: new Date('2024-01-01'),
      status: 'active',
      version: '1.0',
      create_date: new Date('2024-01-01'),
      update_date: new Date('2024-01-01'),
    },
    {
      id: 2,
      title: 'Política de Privacidad',
      content: 'Este documento describe cómo manejamos su privacidad...',
      effective_date: new Date('2024-01-01'),
      status: 'deleted', // Documento marcado como eliminado
      version: '1.0',
      create_date: new Date('2024-01-01'),
      update_date: new Date('2024-01-01'),
    },
  ];
  
  privacyData: Partial<PrivacyDocument> = {
    title: '',
    content: '',
    effective_date: undefined,
    status: 'active', // Estado predeterminado
  };

  isEditMode = false;
  isAddMode = false;
  selectedDocumentId?: number;

  // Abre el modal de agregar
  openAddModal() {
    this.isAddMode = true;
    this.privacyData = {
      title: '',
      content: '',
      effective_date: undefined,
      status: 'active'
    }; // Limpieza básica sin llamar a clearForm()
  }
  

  // Cierra el modal de agregar
  closeAddModal() {
    this.isAddMode = false;
    this.clearForm();
  }

  // Abre el modal para editar el documento
  editDocument(document: PrivacyDocument) {
    this.isEditMode = true;
    this.selectedDocumentId = document.id;
    this.privacyData = { ...document };
  }

  // Cierra el modal y limpia el formulario
  closeModal() {
    this.isEditMode = false;
    this.clearForm();
  }

  // Agregar un nuevo documento
  addDocument() {
    const newDocument: PrivacyDocument = {
      id: this.documents.length + 1,
      title: this.privacyData.title!,
      content: this.privacyData.content!,
      effective_date: this.privacyData.effective_date,
      status: this.privacyData.status, // Usar la propiedad status
      version: '1.0',
      create_date: new Date(),
      update_date: new Date(),
    };
    this.documents.push(newDocument);
    this.clearForm();
  }
  
  updateDocument() {
    const index = this.documents.findIndex(doc => doc.id === this.selectedDocumentId);
    if (index !== -1) {
      this.documents[index] = {
        ...this.documents[index],
        ...this.privacyData,
        update_date: new Date(),
        version: (parseFloat(this.documents[index].version) + 0.1).toFixed(1),
      };
      this.clearForm();
    }
  }
  

  // Eliminar un documento
  deleteDocument(id: number) {
    this.documents = this.documents.filter(doc => doc.id !== id);
  }

  // Limpia el formulario y desactiva el modo de edición
  clearForm(shouldCloseModals: boolean = true) {
    this.privacyData = {
      title: '',
      content: '',
      effective_date: undefined,
      status: 'active'
    };
    
    if (shouldCloseModals) {
      this.isEditMode = false;
      this.isAddMode = false;
    }
  
    this.selectedDocumentId = undefined;
  }
  
  // Guarda el documento (agregar o actualizar)
  saveDocument() {
    if (this.isEditMode) {
      this.updateDocument();
    } else {
      this.addDocument();
    }
    this.closeModal();
  }
}
