import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditClubComponent } from './create-edit-club.component';

describe('CreateEditClubComponent', () => {
  let component: CreateEditClubComponent;
  let fixture: ComponentFixture<CreateEditClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditClubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
