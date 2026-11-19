import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { QuestionService } from './question.service';
import { TEST_PROVIDERS } from '../../testing/test-setup';

describe('QuestionService', () => {
  let service: QuestionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: TEST_PROVIDERS });
    service = TestBed.inject(QuestionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('requests the questions of a single platform', () => {
    service.getQuestionsForPlatform('42').subscribe();
    const req = httpMock.expectOne('/api/question/platform/42');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
