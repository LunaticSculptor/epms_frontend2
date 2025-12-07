import { Injectable, signal, computed } from '@angular/core';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private readonly TIMEOUT_SECONDS = 600; // 10 minutes
  private intervalId: any;

  timeLeft = signal<number>(this.TIMEOUT_SECONDS);
  formattedTime = computed(() => {
    const minutes = Math.floor(this.timeLeft() / 60);
    const seconds = this.timeLeft() % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  });

  constructor(private authService: AuthService) {
    this.startTimer();
  }

  startTimer() {
    this.stopTimer();
    this.timeLeft.set(this.TIMEOUT_SECONDS);

    this.intervalId = setInterval(() => {
      const current = this.timeLeft();
      if (current > 0) {
        this.timeLeft.set(current - 1);
      } else {
        this.stopTimer();
        this.authService.logout();
      }
    }, 1000);
  }

  resetTimer() {
    this.startTimer();
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
