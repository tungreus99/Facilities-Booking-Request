import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventMemberComponent } from './add-event-member.component';

describe('AddEventMemberComponent', () => {
  let component: AddEventMemberComponent;
  let fixture: ComponentFixture<AddEventMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
