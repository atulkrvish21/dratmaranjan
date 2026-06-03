import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainTumorSurgeryComponent } from './brain-tumor-surgery.component';

describe('BrainTumorSurgeryComponent', () => {
  let component: BrainTumorSurgeryComponent;
  let fixture: ComponentFixture<BrainTumorSurgeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrainTumorSurgeryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrainTumorSurgeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
