import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesidebarComponent } from './thesidebar.component';

describe('ThesidebarComponent', () => {
  let component: ThesidebarComponent;
  let fixture: ComponentFixture<ThesidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThesidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
