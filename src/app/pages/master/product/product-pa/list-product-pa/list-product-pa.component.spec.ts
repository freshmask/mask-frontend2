import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductPaComponent } from './list-product-pa.component';

describe('ListProductPaComponent', () => {
  let component: ListProductPaComponent;
  let fixture: ComponentFixture<ListProductPaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductPaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
