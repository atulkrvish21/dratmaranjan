import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrokeManagementComponent } from './stroke-management.component';

describe('StrokeManagementComponent', () => {
  let component: StrokeManagementComponent;
  let fixture: ComponentFixture<StrokeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrokeManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrokeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
