import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../../../core/providers/admin.service';
import { NotificationService } from '../../../core/providers/notification.service';

interface User {
  username: string;
  email: string;
  verification: boolean;
}

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    imports: [CommonModule]
})
export class UserComponent {
  users: User[] = []; // Define el array de usuarios

  constructor(private adminService: AdminService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(
      (data) => {
        this.users = data; 
      },
      (error) => {
        this.notificationService.error(
          "Error Obteniendo datos",
          error
        );
      }
    );
  }
}
