import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPackageProductComponent } from './list-package-product.component';

describe('ListPackageProductComponent', () => {
  let component: ListPackageProductComponent;
  let fixture: ComponentFixture<ListPackageProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPackageProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPackageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
