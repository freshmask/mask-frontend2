import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductParComponent } from './list-product-par.component';

describe('ListProductParComponent', () => {
  let component: ListProductParComponent;
  let fixture: ComponentFixture<ListProductParComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductParComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
