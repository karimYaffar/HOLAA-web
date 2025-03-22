import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject, interval, Observable, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { IApiResponse } from '../interfaces/api.response.interface';
import { AuthResponse } from '../interfaces/auth.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  #auth = signal<boolean>(false);
  #authSubject$ = new BehaviorSubject<boolean>(false);
  #lastTokenRefresh = signal<Date | null>(null);
  #tokenRefreshInterval = 4 * 60 * 1000; // 4 minutos
  #refreshSubscription: Subscription | null = null;
  #isInitialized = false;

  protected override endpoint: string = 'auth';

  isAuth = computed(() => this.#auth());

  authState = this.#authSubject$.asObservable();

  constructor() {
    super();
    // Sincronizar el BehaviorSubject con el signal
    this.#authSubject$.subscribe(state => {
      this.#auth.set(state);
      if (state && !this.#isInitialized) {
        this.startTokenRefresh();
        this.#isInitialized = true;
      } else if (!state) {
        this.stopTokenRefresh();
        this.#isInitialized = false;
      }
    });

    // Verificar la sesión al iniciar
    this.checkSession().subscribe({
      next: (response) => {
        if (response.data.authenticate) {
          this.updateAuthState(true);
        }
      },
      error: () => {
        this.updateAuthState(false);
      }
    });
  }

  private startTokenRefresh(): void {
    // Detener cualquier intervalo existente
    this.stopTokenRefresh();
    
    // Iniciar nuevo intervalo
    this.#refreshSubscription = interval(this.#tokenRefreshInterval).pipe(
      switchMap(() => this.refreshToken()),
      catchError(() => {
        this.updateAuthState(false);
        return of(null);
      })
    ).subscribe();
  }

  private stopTokenRefresh(): void {
    if (this.#refreshSubscription) {
      this.#refreshSubscription.unsubscribe();
      this.#refreshSubscription = null;
    }
  }

  private updateAuthState(isAuthenticated: boolean): void {
    this.#authSubject$.next(isAuthenticated);
    if (isAuthenticated) {
      this.#lastTokenRefresh.set(new Date());
    }
  }

  /**
   * Endpoint that handle logic about user's authentication
   * @param username user's username
   * @param password user's password
   * @returns An observable that resolves when the user is successfully logged
   */
  logIn(username: string, password: string): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'login',
      { username, password },
      { withCredentials: true },
    ).pipe(
      tap(() => {
        this.updateAuthState(true);
        this.#lastTokenRefresh.set(new Date());
      })
    );
  }

  /**
   * Endpoint that handle logic about user's registration
   * @param username user's username
   * @param email user's email account
   * @param password user's password
   * @param phone user's phone
   * @returns A observable that resolves when the user is successfully registered
   */
  signUp(
    username: string,
    email: string,
    password: string,
    phone: string,
  ): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'signup',
      {
        username,
        password,
        email,
        phone,
      },
      {
        withCredentials: true,
      },
    );
  }

  logout(): Observable<IApiResponse> {
    return this.get<IApiResponse>('logout', { withCredentials: true }).pipe(
      tap(() => this.updateAuthState(false))
    );
  }

  sendVerificationCode(phone: string): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'send/sms/code',
      { phone },
      { withCredentials: true },
    );
  }

  verifyVerificationCode(
    phone: string,
    code: string,
  ): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'verify/sms/code',
      { phone, code },
      { withCredentials: true },
    );
  }

  acoountActivation(token: string): Observable<IApiResponse> {
    return this.get<IApiResponse>(`account/activate/${token}`);
  }

  sendRecoveryLink(email: string): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'send/email/recovery/link',
      { email },
      { withCredentials: true },
    );
  }

  accountVerification(token: string): Observable<IApiResponse | null> {
    return this.post<IApiResponse>(
      `verify/email/link/${token}`, 
      {}, 
      { withCredentials: true }
    ).pipe(
      tap((response) => {
        if (response.data.authenticate) {
          // Actualizar el estado directamente
          this.#authSubject$.next(true);
          this.#auth.set(true);
          this.#lastTokenRefresh.set(new Date());
          // Iniciar el refresco del token si no está inicializado
          if (!this.#isInitialized) {
            this.startTokenRefresh();
            this.#isInitialized = true;
          }
        } else {
          this.#authSubject$.next(false);
          this.#auth.set(false);
        }
      }),
      catchError(() => {
        this.#authSubject$.next(false);
        this.#auth.set(false);
        return of(null);
      })
    );
  }

  checkSession(): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'session',
      {},
      { withCredentials: true },
    ).pipe(
      tap((response) => this.updateAuthState(response.data.authenticate))
    );
  }

  refreshToken(): Observable<IApiResponse | null> {
    return this.post<IApiResponse>(
      'refresh',
    {},
      { withCredentials: true },
    ).pipe(
      tap((response) => {
        if (response.data.revoke) {
          this.updateAuthState(true);
          this.#lastTokenRefresh.set(new Date());
        } else {
          this.updateAuthState(false);
        }
      }),
      catchError(() => {
        this.updateAuthState(false);
        return of(null);
      })
    );
  }

  // Método para forzar el refresco del token
  forceTokenRefresh(): Observable<IApiResponse | null> {
    return this.refreshToken();
  }

  // Método para obtener la última vez que se refrescó el token
  getLastTokenRefresh(): Date | null {
    return this.#lastTokenRefresh();
  }

  forgotPassword(email: string): Observable<AuthResponse> {
    return this.post<AuthResponse>('forgot-password', { email });
  }

  resetPassword(newPassword: string): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'reset/password',
      { newPassword },
      { withCredentials: true },
    );
  }

  // Método para forzar la actualización del estado
  forceAuthStateUpdate(): void {
    this.checkSession().subscribe({
      next: (response) => {
        if (response.data.authenticate) {
          this.#authSubject$.next(true);
          this.#auth.set(true);
          this.#lastTokenRefresh.set(new Date());
        } else {
          this.#authSubject$.next(false);
          this.#auth.set(false);
        }
      },
      error: () => {
        this.#authSubject$.next(false);
        this.#auth.set(false);
      }
    });
  }
}
