import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPackagePaComponent } from './form-package-pa.component';

describe('FormPackagePaComponent', () => {
  let component: FormPackagePaComponent;
  let fixture: ComponentFixture<FormPackagePaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPackagePaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPackagePaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
