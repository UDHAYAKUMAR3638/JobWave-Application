import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterProfileCompletionComponent } from './recruiter-profile-completion.component';

describe('RecruiterProfileCompletionComponent', () => {
  let component: RecruiterProfileCompletionComponent;
  let fixture: ComponentFixture<RecruiterProfileCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruiterProfileCompletionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RecruiterProfileCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
