import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface User {
  username: string;
  email: string;
  isVerified: boolean;
}

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [CommonModule],
})
export class UserComponent {
  users: User[] = [
    { username: 'johndoe', email: 'john@example.com', isVerified: true },
    { username: 'janedoe', email: 'jane@example.com', isVerified: false },
    { username: 'mike89', email: 'mike@example.com', isVerified: true },
    // Agrega más usuarios si lo deseas
  ];
}
