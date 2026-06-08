import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastData{
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'warning';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastState = new BehaviorSubject<ToastData>({show: false, message: '', type: 'success'});
  toast$ = this.toastState.asObservable();

  show(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    this.toastState.next({show: true, message, type})

    // Auto-hide após 3 segundos
    setTimeout(() => {
      this.toastState.next({show: false, message, type});
    }, 3000);
  }

  hide() {
    this.toastState.next({...this.toastState.value, show: false});
  }
}
