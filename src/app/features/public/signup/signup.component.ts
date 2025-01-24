import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "../../../core/providers/auth.service";
import { NotificationService } from "../../../core/providers/notification.service";
import { PrommobannerComponent } from "../../../shared/components/prommobanner/prommobanner.component";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [PrommobannerComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
  providers: [CookieService],
})
export class SignupComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly cookieService: CookieService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
        ],
      ],
      confirmPassword: ["", [Validators.required]],
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    return group.get('password')?.value === group.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      //Obtencion de los datos
      const { username, email, password } = this.registerForm.value;

      // Implementar logica para el registro y peticion al backend
      // se debe de enviar los datos enviar al siguiente pagina que es login
      this.authService.signup(username, email, password).subscribe({
        next: (res) => {
          this.notificationService.show(
            'Verficacion necesaria', 
            res.message,
            "toast-top-right",
            "toast-info"
          ).onHidden.subscribe({
            next: () => {
              this.router.navigate(['/verification']);
            }
          });
        },
        error: (err) => {
          this.notificationService.show(
            "Estimado usuario",
            err.message,
            "toast-top-right",
            "toast-info"
          )
        }
      })
    } else {
      this.notificationService.show(
        'Campos Invalidos', 
        'Por favor de revisar los campos',
        "toast-top-right",
        "toast-warning"
      )
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
