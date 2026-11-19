import { ComponentFixture, TestBed } from '@angular/core/testing';
import jsPDF from 'jspdf';
import { PlatformDetailComponent } from './platform-detail.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../testing/test-setup';

describe('PlatformDetailComponent', () => {
  let fixture: ComponentFixture<PlatformDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlatformDetailComponent],
      imports: TEST_IMPORTS,
      providers: TEST_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformDetailComponent);
    // The template expects a loaded platform; seed one instead of waiting for the HTTP response.
    fixture.componentInstance.platform = { id: '1', platformName: 'Example', score: 0, status: false };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exports the questions and answers to a PDF named after the platform', () => {
    // jsPDF defines save() per instance, so capture the document through a plugin method
    // and replace save() to avoid triggering a real download.
    let pageCount = 0;
    const save = jasmine.createSpy('save').and.callFake(function (this: jsPDF) {
      pageCount = this.getNumberOfPages();
    });
    const api = jsPDF.API as unknown as { splitTextToSize: (this: jsPDF, ...args: unknown[]) => string[] };
    const splitTextToSize = api.splitTextToSize;
    spyOn(api, 'splitTextToSize').and.callFake(function (this: jsPDF, ...args: unknown[]) {
      this.save = save;
      return splitTextToSize.apply(this, args);
    });
    const longText = 'A long answer that has to be wrapped over multiple lines. '.repeat(20);
    fixture.componentInstance.questions = Array.from({ length: 30 }, (_, i) => ({
      id: `${i}`,
      textQuestion: `Question ${i}?`,
      answers: [{ id: i, textAnswer: longText, score: 1, question: null }],
    }));

    fixture.componentInstance.generatePDF();

    expect(save).toHaveBeenCalledOnceWith('platform-Example.pdf');
    expect(pageCount).toBeGreaterThan(1);
  });
});
