import { animate, style, transition, trigger } from '@angular/animations';
import { Platform } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  Input,
  OnInit,
  signal
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ModalService } from '../../core/providers/modal.service';

@Component({
  selector: 'announcement-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './announcement.component.html',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))]),
    ]),

    trigger('modalContent', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.98)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),

    trigger('leftContent', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate(
          '350ms 100ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
    ]),

    trigger('rightContent', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate(
          '350ms 100ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
    ]),
  ],
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AnnouncementComponent implements OnInit {
  isOpen = computed(() => this.modalService.open());
  #isCookiesReady = signal<boolean>(false);

  @Input({ required: true }) modalId: string = '';

  private cookieModalId: string = `announcement_${this.modalId}`;

  constructor(
    private readonly cookieService: CookieService,
    private readonly modalService: ModalService,
    private readonly platform: Platform,
  ) {
  }

  ngOnInit(): void {
    if (!this.platform.isBrowser) return;

    if (document.readyState !== 'complete') {
      window.addEventListener('load', () => this.checkAndShowModal());
    }

    this.checkAndShowModal();
  }

  private checkCookiesIsReady(): void {
    if (this.cookieService.check(this.cookieModalId) || document.cookie) {
      this.#isCookiesReady.set(true);
    }
  }

  private checkCookieModal(): boolean {
    return this.#isCookiesReady() && this.cookieService.check(this.cookieModalId);
  }

  private checkAndShowModal(): void {
    let timeout: NodeJS.Timeout | undefined;

    this.checkCookiesIsReady();

    if (!this.checkCookieModal()) {
      clearTimeout(timeout);
      return this.modalService.show();
    }

   
    timeout = setTimeout(() => this.checkAndShowModal, 500);
  }


  close(): void {
    this.cookieService.set(this.cookieModalId, 'true');
    this.modalService.close();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('fixed')) {
      this.close();
    }
  }
}
