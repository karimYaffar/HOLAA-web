import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly emailSignal = signal<string>('');

  private readonly navigateSignal = signal<string>('');

  setNavigate(navigate: string) {
    this.navigateSignal.set(navigate);
  }

  getNavigate(): string {
    return this.navigateSignal();
  }

  setEmail(email: string) {
    this.emailSignal.set(email);
  }

  getEmail(): string {
    return this.emailSignal();
  }

}
