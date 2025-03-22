import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  signal,
} from '@angular/core';
import { ServerService } from './core/providers/server.service';
import { MaintenanceComponent } from './shared/maintenance/maintenance.component';
import { NavbarComponent } from './features/public/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './features/public/footer/footer.component';
import { AnnouncementComponent } from './shared/announcement/announcement.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MaintenanceComponent,
    NavbarComponent,
    RouterOutlet,
    FooterComponent,
    AnnouncementComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  isServerAvailable = computed(() => this.serverService.isServerAvailable);
  isRouterOutletLoaded = signal<boolean>(false);
  isViewAvailable = signal<boolean>(false);
  
  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly serverService: ServerService,
  ) {}

  onActivate(data: any) {
    this.isRouterOutletLoaded.set(true);
  }

  onDesactivate(data: any) {
    this.isRouterOutletLoaded.set(false);
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.isViewAvailable.set(true);
  }
}
