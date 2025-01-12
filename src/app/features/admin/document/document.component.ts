import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CreateDocument, Document, UpdateDocument } from "../../../core/interfaces/document";
import { AdminService } from "../../../core/providers/admin.service";
import { NotificationService } from "../../../core/providers/notification.service";

@Component({
  selector: "app-document",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./document.component.html",
  styleUrls: ["./document.component.css"],
})
export class DocumentComponent implements OnInit {
  formDocument: FormGroup;

  documents: Document[] = [];
  newDocument: CreateDocument = {};
  displayedDocuments: Document[] = [];
  updateDocument: UpdateDocument = {};
  currentDocument: Partial<Document> = {};
  filteredDocument: Document[] =[];
  
  currentPage: number = 1;
  documentsPerPage: number = 6;
  totalDocuments: number = 0;

  isAddMode: boolean = false;
  isEditMode: boolean = false;
  titleFilter: string = '';
  statusFilter: string = '';
  

  constructor(
    private readonly adminService: AdminService,
    private readonly fb: FormBuilder,
    private readonly notificationService: NotificationService
  ) {
    this.formDocument = fb.group({
      title: ["", [Validators.required]],
      content: ["", [Validators.required]],
      effective_date: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadDocuments();
  }


  loadDocuments(): void {
    this.adminService.getAllDocuments().subscribe((documents) => {
      this.documents = documents;
      this.totalDocuments = documents.length;
      this.applyFilters();
      this.setPage(1);
    });
  }

  applyFilters(): void {
    this.filteredDocument = this.documents.filter(document => {
      const titleMatch = document.title.toLowerCase().includes(this.titleFilter.toLowerCase());

      const status =
        document.isDelete ? 'Eliminado' : document.current ? 'Vigente' : 'No Vigente';
      const statusMatch = !this.statusFilter || status === this.statusFilter;

      return titleMatch && statusMatch;
    });

    this.totalDocuments = this.filteredDocument.length;
    this.setPage(1); 
  }

  setPage(page: number): void {
    this.currentPage = page;
    const start = (page - 1) * this.documentsPerPage;
    const end = start + this.documentsPerPage;
    this.displayedDocuments = this.filteredDocument.slice(start, end);
  }

  openAddModal(): void {
    this.isAddMode = true;
  }

  openEditModal(currentDocument: Document): void {
    this.isEditMode = true;
    this.isAddMode = false;
    this.currentDocument = currentDocument
  }

  closeModals(): void {
    this.isAddMode = false;
    this.isEditMode = false;
  }

  createDocument(): void {
    this.formDocument.controls['effective_date'].setValue(new Date());

    if (this.formDocument.valid) {
      this.newDocument = this.formDocument.value;

      this.adminService.createDocument(this.newDocument).subscribe({
        next: (res) => {
          this.notificationService.success(
            "Creado con exito",
            "Se ha creado con exito el documento"
          );
          this.loadDocuments();
          this.closeModals();
        },
        error: (err) => {
          console.log(err);
          this.notificationService.error(
            "Excepcion producida",
            "Error al crear documento"
          );
        },
      });
    } else {
      this.notificationService.error(
        "Por favor revise campos",
        "Campos invalidos"
      );
    }
  }

  editDocument(): void {
    const { _id, update_date, create_date, version, current, isDelete, ...document } = this.currentDocument;

    document.effective_date = new Date();

    this.updateDocument = document;

    this.adminService.updateDocument(_id, this.updateDocument).subscribe({
      next: (res) => {
        this.notificationService.success(
          "Actualizado con exito",
          res.message
        );

        this.loadDocuments();

        this.closeModals();

      },
      error: (err) => {
        console.log(err);
        this.notificationService.error(
          "Excepcion producida",
          "Error al editar los datos"
        )
      }
    })

  }

  deleteDocument(documentId: string): void {
    this.adminService.deleteDocument(documentId).subscribe({
      next: (res) => {
        this.notificationService.success("Documento eliminado", res.message);
        this.loadDocuments();
      },
      error: (err) => {
        this.notificationService.error("Excepcion producida", "Error al momento de eliminar documento")
      }
    })
  }

  activeDocument(documentId: string, state: boolean): void {
    if (state) { 
      return;
    }

    this.adminService.activeDocument(documentId).subscribe({
      next: (res) => {
        this.notificationService.success("Documento Activado", res.message);
        this.loadDocuments();
      },
      error: (err) => {
        console.log(err);
        this.notificationService.error("Excepcion producida", "Error al momento de activar documento")
      }
    })
  } 

  getTotalPages(): number[] {
    return Array(Math.ceil(this.totalDocuments / this.documentsPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}
