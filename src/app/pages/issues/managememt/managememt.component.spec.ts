import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagememtComponent } from './managememt.component';

describe('ManagememtComponent', () => {
  let component: ManagememtComponent;
  let fixture: ComponentFixture<ManagememtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagememtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagememtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
