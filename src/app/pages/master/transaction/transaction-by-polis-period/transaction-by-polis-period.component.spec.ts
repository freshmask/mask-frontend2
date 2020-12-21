import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionByPolisPeriodComponent } from './transaction-by-polis-period.component';

describe('TransactionByPolisPeriodComponent', () => {
  let component: TransactionByPolisPeriodComponent;
  let fixture: ComponentFixture<TransactionByPolisPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionByPolisPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionByPolisPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
