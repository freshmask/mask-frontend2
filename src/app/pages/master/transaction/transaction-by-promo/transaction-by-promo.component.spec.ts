import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionByPromoComponent } from './transaction-by-promo.component';

describe('TransactionByPromoComponent', () => {
  let component: TransactionByPromoComponent;
  let fixture: ComponentFixture<TransactionByPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionByPromoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionByPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
