import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimallyInvasiveSpineSurgeryComponent } from './minimally-invasive-spine-surgery.component';

describe('MinimallyInvasiveSpineSurgeryComponent', () => {
  let component: MinimallyInvasiveSpineSurgeryComponent;
  let fixture: ComponentFixture<MinimallyInvasiveSpineSurgeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimallyInvasiveSpineSurgeryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimallyInvasiveSpineSurgeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
