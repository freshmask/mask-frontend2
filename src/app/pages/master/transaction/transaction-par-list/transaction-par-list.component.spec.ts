import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionParListComponent } from './transaction-par-list.component';

describe('TransactionParListComponent', () => {
  let component: TransactionParListComponent;
  let fixture: ComponentFixture<TransactionParListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionParListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionParListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
