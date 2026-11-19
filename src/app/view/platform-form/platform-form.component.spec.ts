import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PlatformFormComponent } from './platform-form.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../testing/test-setup';
import { Platform } from '../../model/platform/platform';

describe('PlatformFormComponent', () => {
  let fixture: ComponentFixture<PlatformFormComponent>;
  let component: PlatformFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlatformFormComponent],
      imports: TEST_IMPORTS,
      providers: TEST_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.platforms = [{ id: '1', platformName: 'Microsoft Teams', score: 0, status: false } as Platform];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('accepts a platform name that is clearly different', () => {
    expect(component.checkName('Google Classroom')).toBeTrue();
    expect(component.errorShown).toBeFalse();
  });

  it('rejects an exact duplicate name and hides the error after 7 seconds', fakeAsync(() => {
    expect(component.checkName('Microsoft Teams')).toBeFalse();
    expect(component.errorShown).toBeTrue();
    tick(7000);
    expect(component.errorShown).toBeFalse();
  }));

  it('rejects a misspelled variant of an existing name', fakeAsync(() => {
    expect(component.checkName('Microsof Teams')).toBeFalse();
    tick(7000);
  }));

  it('compares names with the configured misspelling tolerance', () => {
    expect(component.isAlikeWithMisspelling('Zoom', 'Zoom', 0.5)).toBeTrue();
    expect(component.isAlikeWithMisspelling('Zoom', 'Moodle', 0.5)).toBeFalse();
  });
});
