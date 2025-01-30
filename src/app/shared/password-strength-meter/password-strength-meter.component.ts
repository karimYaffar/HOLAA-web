import { Component, Input } from '@angular/core';
import { PasswordStrength } from '../../core/providers/password-strength.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-strength-meter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-strength-meter.component.html',
  styleUrl: './password-strength-meter.component.css'
})
export class PasswordStrengthMeterComponent {
  @Input() strength: PasswordStrength = {
    score: 0,
    status: 'very-weak',
    color: '#ff4d4f',
    percentage: 20
  };
}
