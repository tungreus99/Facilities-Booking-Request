import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportFacilityComponent } from './import-facility.component';

describe('ImportFacilityComponent', () => {
  let component: ImportFacilityComponent;
  let fixture: ComponentFixture<ImportFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportFacilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
