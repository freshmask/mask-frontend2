import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTravelListComponent } from './transaction-travel-list.component';

describe('TransactionTravelListComponent', () => {
  let component: TransactionTravelListComponent;
  let fixture: ComponentFixture<TransactionTravelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionTravelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTravelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
