import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityScheduleComponent } from './facility-schedule.component';

describe('FacilityScheduleComponent', () => {
  let component: FacilityScheduleComponent;
  let fixture: ComponentFixture<FacilityScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
