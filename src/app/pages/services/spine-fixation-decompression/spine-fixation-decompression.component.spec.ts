import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpineFixationDecompressionComponent } from './spine-fixation-decompression.component';

describe('SpineFixationDecompressionComponent', () => {
  let component: SpineFixationDecompressionComponent;
  let fixture: ComponentFixture<SpineFixationDecompressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpineFixationDecompressionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpineFixationDecompressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
