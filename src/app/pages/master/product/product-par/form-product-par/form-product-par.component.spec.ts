import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductParComponent } from './form-product-par.component';

describe('FormProductParComponent', () => {
  let component: FormProductParComponent;
  let fixture: ComponentFixture<FormProductParComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProductParComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
