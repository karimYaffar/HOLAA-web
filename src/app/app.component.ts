import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { SlideAnimationComponent } from "./shared/components/slide-animation/slide-animation.component";
import { NewsletterComponent } from "./shared/components/newsletter/newsletter.component";
import { NgxToastModule } from "@angular-magic/ngx-toast";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    SlideAnimationComponent,
    NewsletterComponent,
    NgxToastModule
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {}
