import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SocialbubbleComponent } from "./shared/components/socialbubble/socialbubble.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    SocialbubbleComponent
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {}
