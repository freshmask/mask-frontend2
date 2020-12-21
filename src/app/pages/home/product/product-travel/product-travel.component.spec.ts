import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTravelComponent } from './product-travel.component';

describe('ProductTravelComponent', () => {
  let component: ProductTravelComponent;
  let fixture: ComponentFixture<ProductTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
