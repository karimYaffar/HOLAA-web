import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { CompanyProfile } from '../../../core/interfaces/business.profile';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit{

  businessProfile: Partial<CompanyProfile> = {}


  constructor(private location: Location,
    private readonly adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadBusinessProfile()
  }

  goBack(): void {
    this.location.back();
  }

  loadBusinessProfile(): void {
    this.adminService.getBusinessProfile().subscribe({
      next: (profile) => {
        this.businessProfile = profile;
      },
    });
  }
}
