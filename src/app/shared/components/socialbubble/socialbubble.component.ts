import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { SocialSite } from '../../../core/interfaces/social.site';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-socialbubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './socialbubble.component.html',
  styleUrl: './socialbubble.component.css'
})
export class SocialbubbleComponent implements OnInit {

  isOpen = true;

  socialSites: SocialSite[] = [];

  constructor(
    private readonly adminService: AdminService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadSocialSites();
  }

  /**
   * Metodo para obtener datos de las redes sociales
   */
  loadSocialSites(): void {
    this.adminService.getSocialSites().subscribe({
      next:(socialSites) => {
        this.socialSites = socialSites
      },
      error:(err) => {
      }
    })
  }

  /**
   * Metodo para manipular el objecto
   */
  toggleBubble(): void {
    this.isOpen = !this.isOpen;
  }

}
