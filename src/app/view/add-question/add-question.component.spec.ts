import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddQuestionComponent } from './add-question.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../testing/test-setup';

describe('AddQuestionComponent', () => {
  let fixture: ComponentFixture<AddQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddQuestionComponent],
      imports: TEST_IMPORTS,
      providers: TEST_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(AddQuestionComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
