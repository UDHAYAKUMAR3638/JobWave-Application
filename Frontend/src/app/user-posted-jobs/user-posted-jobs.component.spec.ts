import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostedJobsComponent } from './user-posted-jobs.component';

describe('UserPostedJobsComponent', () => {
  let component: UserPostedJobsComponent;
  let fixture: ComponentFixture<UserPostedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPostedJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPostedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
