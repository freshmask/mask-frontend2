import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimPaComponent } from './claim-pa.component';

describe('ClaimPaComponent', () => {
  let component: ClaimPaComponent;
  let fixture: ComponentFixture<ClaimPaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimPaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
