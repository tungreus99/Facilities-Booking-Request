import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SROManagementComponent } from './sro-management.component';

describe('SROManagementComponent', () => {
  let component: SROManagementComponent;
  let fixture: ComponentFixture<SROManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SROManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SROManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
