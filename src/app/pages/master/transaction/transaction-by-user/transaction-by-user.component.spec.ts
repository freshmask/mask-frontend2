import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionByUserComponent } from './transaction-by-user.component';

describe('TransactionByUserComponent', () => {
  let component: TransactionByUserComponent;
  let fixture: ComponentFixture<TransactionByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
