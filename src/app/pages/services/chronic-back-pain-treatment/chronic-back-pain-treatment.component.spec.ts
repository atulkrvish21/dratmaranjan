import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronicBackPainTreatmentComponent } from './chronic-back-pain-treatment.component';

describe('ChronicBackPainTreatmentComponent', () => {
  let component: ChronicBackPainTreatmentComponent;
  let fixture: ComponentFixture<ChronicBackPainTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChronicBackPainTreatmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChronicBackPainTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
