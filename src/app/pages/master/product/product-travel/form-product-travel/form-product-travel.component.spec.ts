import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductTravelComponent } from './form-product-travel.component';

describe('FormProductTravelComponent', () => {
  let component: FormProductTravelComponent;
  let fixture: ComponentFixture<FormProductTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProductTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
