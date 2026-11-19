import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { ArchiefComponent } from './archief.component';
import { TEST_PROVIDERS } from '../../../testing/test-setup';

describe('ArchiefComponent', () => {
  let fixture: ComponentFixture<ArchiefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiefComponent],
      providers: TEST_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(ArchiefComponent);
    fixture.detectChanges();
  });

  it('keeps only archived platforms', () => {
    TestBed.inject(HttpTestingController)
      .expectOne('/api/platform/sorted')
      .flush([
        { id: '1', platformName: 'Active', score: 5, status: false },
        { id: '2', platformName: 'Archived', score: 3, status: true },
      ]);

    expect(fixture.componentInstance.platforms.map((p) => p.platformName)).toEqual(['Archived']);
  });
});
