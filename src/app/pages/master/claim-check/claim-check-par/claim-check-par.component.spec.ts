import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCheckParComponent } from './claim-check-par.component';

describe('ClaimCheckParComponent', () => {
  let component: ClaimCheckParComponent;
  let fixture: ComponentFixture<ClaimCheckParComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimCheckParComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimCheckParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
