import { Component, EventEmitter, Output } from "@angular/core";
import { ButtonControlComponent } from "../../../../shared/ui/button/button-control.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NavigationLinkComponent } from "../../../../shared/ui/navigation-link/navigation-link.component";
import { IconControlComponent } from "../../../../shared/ui/icon-control/icon-control.component";
@Component({
  selector: 'form-request-forgot-password',
  templateUrl: './form-request-forgot-password.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonControlComponent,
    NavigationLinkComponent,
    IconControlComponent
],
})
export class FormRequestForgotPasswordComponent {
  @Output() onNextStep = new EventEmitter<void>();

  
}