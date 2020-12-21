import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductPaComponent } from './form-product-pa.component';

describe('FormProductPaComponent', () => {
  let component: FormProductPaComponent;
  let fixture: ComponentFixture<FormProductPaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProductPaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
