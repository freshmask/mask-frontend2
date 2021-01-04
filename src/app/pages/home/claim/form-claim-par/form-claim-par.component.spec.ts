import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClaimParComponent } from './form-claim-par.component';

describe('FormClaimParComponent', () => {
  let component: FormClaimParComponent;
  let fixture: ComponentFixture<FormClaimParComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormClaimParComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormClaimParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
