import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatEditAdminComponent } from './creat-edit-admin.component';

describe('CreatEditAdminComponent', () => {
  let component: CreatEditAdminComponent;
  let fixture: ComponentFixture<CreatEditAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatEditAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatEditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
