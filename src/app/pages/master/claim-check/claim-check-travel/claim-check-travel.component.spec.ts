import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCheckTravelComponent } from './claim-check-travel.component';

describe('ClaimCheckTravelComponent', () => {
  let component: ClaimCheckTravelComponent;
  let fixture: ComponentFixture<ClaimCheckTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimCheckTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimCheckTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
