import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEventListMemberComponent } from './detail-event-list-member.component';

describe('DetailEventListMemberComponent', () => {
  let component: DetailEventListMemberComponent;
  let fixture: ComponentFixture<DetailEventListMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEventListMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEventListMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
