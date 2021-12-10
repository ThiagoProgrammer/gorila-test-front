import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuedPositionSimplifiedComponent } from './valued-position-simplified.component';

describe('ValuedPositionSimplifiedComponent', () => {
  let component: ValuedPositionSimplifiedComponent;
  let fixture: ComponentFixture<ValuedPositionSimplifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValuedPositionSimplifiedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuedPositionSimplifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
