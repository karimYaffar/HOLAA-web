import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-vision-mission',
  standalone: true,
  imports: [],
  templateUrl: './vision-mission.component.html',
  styleUrl: './vision-mission.component.css'
})
export class VisionMissionComponent {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
