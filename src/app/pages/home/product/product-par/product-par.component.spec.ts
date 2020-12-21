import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductParComponent } from './product-par.component';

describe('ProductParComponent', () => {
  let component: ProductParComponent;
  let fixture: ComponentFixture<ProductParComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductParComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
