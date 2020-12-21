import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductTravelComponent } from './list-product-travel.component';

describe('ListProductTravelComponent', () => {
  let component: ListProductTravelComponent;
  let fixture: ComponentFixture<ListProductTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
