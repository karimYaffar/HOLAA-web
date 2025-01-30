import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./features/public/navbar/navbar.component";
import { ModalService } from "./core/providers/modal.service";
import { CommonModule } from '@angular/common';
import { SignupModalComponent } from "./shared/signup-modal/signup-modal.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SignupModalComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {

  constructor(public modalService: ModalService) {}

  closeModal() {
    this.modalService.closeModal();
  }

}
