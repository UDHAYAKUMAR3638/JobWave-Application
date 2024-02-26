import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuriterProfileCompletionComponent } from './recuriter-profile-completion.component';

describe('RecuriterProfileCompletionComponent', () => {
  let component: RecuriterProfileCompletionComponent;
  let fixture: ComponentFixture<RecuriterProfileCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuriterProfileCompletionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuriterProfileCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
