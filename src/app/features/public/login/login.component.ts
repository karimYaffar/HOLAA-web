import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule, Location } from "@angular/common";
import { PrommobannerComponent } from "../prommobanner/prommobanner.component";
import { Router, RouterLink } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { AuthService } from "../../../core/services/auth.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PrommobannerComponent, RouterLink],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly cookieService: CookieService,
    private readonly authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.logIn(username, password).subscribe({
        next: (res) => {
          this.notificationService.success(
            "Verificacion Necesaria",
            "Se requiere autenticacion, hemos enviado un codigo a su correo electronico asociado",
            
          );

          this.cookieService.set('verification', 'true', {
            sameSite: 'Strict',
            path: '/',
            secure: true
,          });

          this.cookieService.set('verification-auth', 'true', {
            sameSite: 'Strict',
            path: '/',
            secure: true
          });


          this.router.navigate(["/verification"]);
        },
        error: (err) => {
          this.notificationService.info("Estimado Usuario", `${err.message}`);
        },
      });
    } else {
      this.notificationService.error(
        "Ups...",
        "Por favor ingrese bien los campos"
      );
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
