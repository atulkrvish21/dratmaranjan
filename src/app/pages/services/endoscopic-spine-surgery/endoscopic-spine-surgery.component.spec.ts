import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndoscopicSpineSurgeryComponent } from './endoscopic-spine-surgery.component';

describe('EndoscopicSpineSurgeryComponent', () => {
  let component: EndoscopicSpineSurgeryComponent;
  let fixture: ComponentFixture<EndoscopicSpineSurgeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndoscopicSpineSurgeryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndoscopicSpineSurgeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
