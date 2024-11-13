import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly emailSignal = signal<string>('');

  setEmail(email: string) {
    this.emailSignal.set(email);
  }

  getEmail(): Signal<string> {
    return this.emailSignal;
  }

}
