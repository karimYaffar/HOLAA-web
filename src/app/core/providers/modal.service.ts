import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isModalOpenSubject = new BehaviorSubject<boolean>(false);
  isModalOpen$ = this.isModalOpenSubject.asObservable();

  constructor(private readonly storage: StorageMap) {
    const hasVisited = this.storage.get('hasVisitedBefore');
    if (!hasVisited) {
      this.openModal();
    }
  }

  openModal() {
    this.isModalOpenSubject.next(true);
    this.storage.set('hasVisitedBefore', 'true');
  }

  closeModal() {
    this.isModalOpenSubject.next(false);
  }
}