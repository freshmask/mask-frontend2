import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimTravelComponent } from './claim-travel.component';

describe('ClaimTravelComponent', () => {
  let component: ClaimTravelComponent;
  let fixture: ComponentFixture<ClaimTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
