import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeurosurgeonComponent } from './neurosurgeon.component';

describe('NeurosurgeonComponent', () => {
  let component: NeurosurgeonComponent;
  let fixture: ComponentFixture<NeurosurgeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeurosurgeonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeurosurgeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
