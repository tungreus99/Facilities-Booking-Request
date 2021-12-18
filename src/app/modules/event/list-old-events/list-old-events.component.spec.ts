import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOldEventsComponent } from './list-old-events.component';

describe('ListOldEventsComponent', () => {
  let component: ListOldEventsComponent;
  let fixture: ComponentFixture<ListOldEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOldEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOldEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
