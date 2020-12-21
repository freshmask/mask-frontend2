import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionByPolisComponent } from './transaction-by-polis.component';

describe('TransactionByPolisComponent', () => {
  let component: TransactionByPolisComponent;
  let fixture: ComponentFixture<TransactionByPolisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionByPolisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionByPolisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
