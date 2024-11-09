import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAuthComponent } from './dashboard.auth.component';

describe('DashboardAuthComponent', () => {
  let component: DashboardAuthComponent;
  let fixture: ComponentFixture<DashboardAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
