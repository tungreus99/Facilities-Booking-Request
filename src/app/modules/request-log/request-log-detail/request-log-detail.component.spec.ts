import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLogDetailComponent } from './request-log-detail.component';

describe('RequestLogDetailComponent', () => {
  let component: RequestLogDetailComponent;
  let fixture: ComponentFixture<RequestLogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestLogDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestLogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
