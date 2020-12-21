import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPaComponent } from './product-pa.component';

describe('ProductPaComponent', () => {
  let component: ProductPaComponent;
  let fixture: ComponentFixture<ProductPaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
