import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindApplicantComponent } from './find-applicant.component';

describe('FindApplicantComponent', () => {
  let component: FindApplicantComponent;
  let fixture: ComponentFixture<FindApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindApplicantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
