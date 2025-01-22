import { Component, AfterViewInit, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AdminService } from '../../../core/providers/admin.service';
import { CompanyProfile } from '../../../core/interfaces/business.profile';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit, OnInit {
  businessProfile: Partial<CompanyProfile> = {};

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private readonly adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadBusinessProfile();
  }

  loadBusinessProfile(): void {
    this.adminService.getCompanyProfile().subscribe({
      next: (response) => {
        this.businessProfile = response;
      },
      error: () => {
        console.error('No se pudo cargar el perfil de la empresa');
      },
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const menuToggle = document.getElementById('menu-toggle');
      const navbarMenu = document.getElementById('navbar-menu');
      menuToggle?.addEventListener('click', () => {
        navbarMenu?.classList.toggle('hidden');
      });

      const userIcon = document.getElementById('user-icon');
      const modal = document.getElementById('auth-modal');
      const closeModal = document.getElementById('close-modal');

      userIcon?.addEventListener('click', () => {
        modal?.classList.remove('hidden');
      });

      closeModal?.addEventListener('click', () => {
        modal?.classList.add('hidden');
      });
    }
  }
}
