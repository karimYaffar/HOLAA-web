import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent {
  // Podríamos agregar un estado para controlar si el sidebar está colapsado
  isCollapsed = false

  // Método para alternar el estado del sidebar
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed
  }

  logout() {
    // Implementar lógica de cierre de sesión
    console.log("Logout clicked")
  }
}

