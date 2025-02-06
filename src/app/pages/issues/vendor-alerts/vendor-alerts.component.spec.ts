import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAlertsComponent } from './vendor-alerts.component';

describe('VendorAlertsComponent', () => {
  let component: VendorAlertsComponent;
  let fixture: ComponentFixture<VendorAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorAlertsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
