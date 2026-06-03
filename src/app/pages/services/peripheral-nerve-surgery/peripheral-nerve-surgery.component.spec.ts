import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripheralNerveSurgeryComponent } from './peripheral-nerve-surgery.component';

describe('PeripheralNerveSurgeryComponent', () => {
  let component: PeripheralNerveSurgeryComponent;
  let fixture: ComponentFixture<PeripheralNerveSurgeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeripheralNerveSurgeryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeripheralNerveSurgeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
