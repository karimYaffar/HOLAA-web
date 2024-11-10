import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DisclaimerDocument {
  id: number;
  title: string;
  content: string;
  effective_date?: Date;
  status?: 'deleted' | 'active'; // Estado del documento
  version: string;
  create_date: Date;
  update_date: Date;
}

@Component({
  selector: 'app-disclaimer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent {
  documents: DisclaimerDocument[] = [
    {
      id: 1,
      title: 'Deslinde de Responsabilidad',
      content: 'Este documento describe los términos de deslinde de responsabilidad...',
      effective_date: new Date('2024-01-01'),
      status: 'active',
      version: '1.0',
      create_date: new Date('2024-01-01'),
      update_date: new Date('2024-01-01'),
    },
    {
      id: 2,
      title: 'Exención de Responsabilidad',
      content: 'Este documento exime de ciertas responsabilidades...',
      effective_date: new Date('2024-01-01'),
      status: 'deleted', // Documento marcado como eliminado
      version: '1.0',
      create_date: new Date('2024-01-01'),
      update_date: new Date('2024-01-01'),
    },
  ];
  
  disclaimerData: Partial<DisclaimerDocument> = {
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
    this.disclaimerData = {
      title: '',
      content: '',
      effective_date: undefined,
      status: 'active'
    };
  }

  // Cierra el modal de agregar
  closeAddModal() {
    this.isAddMode = false;
    this.clearForm();
  }

  // Abre el modal para editar el documento
  editDocument(document: DisclaimerDocument) {
    this.isEditMode = true;
    this.selectedDocumentId = document.id;
    this.disclaimerData = { ...document };
  }

  // Cierra el modal y limpia el formulario
  closeModal() {
    this.isEditMode = false;
    this.clearForm();
  }

  // Agregar un nuevo documento
  addDocument() {
    const newDocument: DisclaimerDocument = {
      id: this.documents.length + 1,
      title: this.disclaimerData.title!,
      content: this.disclaimerData.content!,
      effective_date: this.disclaimerData.effective_date,
      status: this.disclaimerData.status,
      version: '1.0',
      create_date: new Date(),
      update_date: new Date(),
    };
    this.documents.push(newDocument);
    this.clearForm();
  }
  
  // Actualizar un documento existente
  updateDocument() {
    const index = this.documents.findIndex(doc => doc.id === this.selectedDocumentId);
    if (index !== -1) {
      this.documents[index] = {
        ...this.documents[index],
        ...this.disclaimerData,
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
    this.disclaimerData = {
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
