import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRequestDialogComponent } from './all-request-dialog.component';

describe('AllRequestDialogComponent', () => {
  let component: AllRequestDialogComponent;
  let fixture: ComponentFixture<AllRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRequestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
