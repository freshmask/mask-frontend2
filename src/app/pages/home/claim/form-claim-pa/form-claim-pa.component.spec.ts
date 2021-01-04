import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClaimPaComponent } from './form-claim-pa.component';

describe('FormClaimPaComponent', () => {
  let component: FormClaimPaComponent;
  let fixture: ComponentFixture<FormClaimPaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormClaimPaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormClaimPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
