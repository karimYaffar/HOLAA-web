import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api.response.interface';
import { AuthResponse, SignUpResponse } from '../interfaces/auth.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private isLogged = new BehaviorSubject<boolean>(false);

  protected override endpoint: string = 'auth';


  isAuthenticate(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  setAuth(v: boolean): void {
    this.isLogged.next(v);
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.post<AuthResponse>(
      'login',
      {
        username,
        password,
      },
      {
        withCredentials: true,
      },
    );
  }

  signup(
    username: string,
    email: string,
    password: string,
    phone: string,
  ): Observable<SignUpResponse> {
    return this.post<SignUpResponse>(
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

  logout(): Observable<ApiResponse> {
    return this.get<ApiResponse>('logout', { withCredentials: true }).pipe(
      tap(() => this.setAuth(false)),
    );
  }

  acoountActivation(otp: string): Observable<ApiResponse> {
    return this.post<ApiResponse>('activate', { otp });
  }

  accountVerification(otp: string): Observable<ApiResponse> {
    return this.post<ApiResponse>('mfa/verify', { otp }, {});
  }

  checkSession(): Observable<ApiResponse> {
    return this.post<ApiResponse>('check-session', {}, { withCredentials: true });
  }

  refreshToken(): Observable<boolean> {
    return this.post<boolean>('refresh-token', {}, { withCredentials: true });
  }
  

  forgotPassword(email: string): Observable<AuthResponse> {
    return this.post<AuthResponse>('forgot-password', { email });
  }

  resetPassword(email: string, newPassword: string): Observable<ApiResponse> {
    return this.post<ApiResponse>('reset-password', {
      email,
      newPassword,
    });
  }

  
}
