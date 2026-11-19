import { ComponentFixture, TestBed } from '@angular/core/testing';
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
});
