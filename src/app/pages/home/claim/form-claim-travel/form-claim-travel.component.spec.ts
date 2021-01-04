import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClaimTravelComponent } from './form-claim-travel.component';

describe('FormClaimTravelComponent', () => {
  let component: FormClaimTravelComponent;
  let fixture: ComponentFixture<FormClaimTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormClaimTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormClaimTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
