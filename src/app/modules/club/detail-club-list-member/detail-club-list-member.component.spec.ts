import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClubListMemberComponent } from './detail-club-list-member.component';

describe('DetailClubListMemberComponent', () => {
  let component: DetailClubListMemberComponent;
  let fixture: ComponentFixture<DetailClubListMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailClubListMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailClubListMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
