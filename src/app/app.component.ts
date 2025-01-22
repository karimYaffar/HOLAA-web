import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SocialbubbleComponent } from "./shared/components/socialbubble/socialbubble.component";
import { NavbarComponent } from "./features/public/navbar/navbar.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {}
