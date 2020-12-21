import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionPaListComponent } from './transaction-pa-list.component';

describe('TransactionPaListComponent', () => {
  let component: TransactionPaListComponent;
  let fixture: ComponentFixture<TransactionPaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionPaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionPaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
