import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCheckPaComponent } from './claim-check-pa.component';

describe('ClaimCheckPaComponent', () => {
  let component: ClaimCheckPaComponent;
  let fixture: ComponentFixture<ClaimCheckPaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimCheckPaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimCheckPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
