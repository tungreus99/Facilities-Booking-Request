import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportClubComponent } from './import-club.component';

describe('ImportClubComponent', () => {
  let component: ImportClubComponent;
  let fixture: ComponentFixture<ImportClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportClubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
