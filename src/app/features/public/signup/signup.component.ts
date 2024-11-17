import { Component } from "@angular/core";
import { PrommobannerComponent } from "../prommobanner/prommobanner.component";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { NotificationService } from "../../../core/services/notification.service";
import { AuthService } from "../../../core/services/auth.service";
import { CommonModule, Location } from "@angular/common";
import { Router, RouterLink } from "@angular/router";

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
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      //Obtencion de los datos
      const { username, email, password } = this.registerForm.value;

      // Implementar logica para el registro y peticion al backend
      // se debe de enviar los datos enviar al siguiente pagina que es login
      this.authService.signIn(username, email, password).subscribe({
        next: (res) => {
          this.notificationService.success('Verficacion necesaria', res.message);

          this.cookieService.set('verification', 'true', {
            sameSite: 'Strict',
            path: '/',
            secure: true
          });

          this.router.navigate(['/verification']);

        },
        error: (err) => {
          console.log(err);
          this.notificationService.error(
            'Error',
            'Parece que hubo un error al momento de mandar la solicitud'
          )
        }
      })

    } else {
      this.notificationService.error(
        'Campos Invalidos', 
        'Por favor de revisar los campos'
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
