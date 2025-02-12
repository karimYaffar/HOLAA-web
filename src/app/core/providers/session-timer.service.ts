import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { JWT_INTERVAL } from '../constants/constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SessionTimerService {
  private timerSubscription!: Subscription;
  private isSessionActive = new BehaviorSubject<boolean>(true);

  sessionActive$ = this.isSessionActive.asObservable();

  constructor(private readonly authService: AuthService) {}

  startTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = interval(JWT_INTERVAL).subscribe(() => {
      this.refreshToken();
    })
  }

  stopTimer() {
    if(this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.isSessionActive.next(false);
  }

  private refreshToken() {
    console.log("Token actualizado")
  } 



}
