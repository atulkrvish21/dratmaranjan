import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraumaEmergencyNeurosurgeryComponent } from './trauma-emergency-neurosurgery.component';

describe('TraumaEmergencyNeurosurgeryComponent', () => {
  let component: TraumaEmergencyNeurosurgeryComponent;
  let fixture: ComponentFixture<TraumaEmergencyNeurosurgeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraumaEmergencyNeurosurgeryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraumaEmergencyNeurosurgeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
