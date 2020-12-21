import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimParComponent } from './claim-par.component';

describe('ClaimParComponent', () => {
  let component: ClaimParComponent;
  let fixture: ComponentFixture<ClaimParComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimParComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
