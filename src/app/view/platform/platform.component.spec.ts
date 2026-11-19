import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationColumnComponent } from '../navigation-column/navigation-column.component';
import { HttpTestingController } from '@angular/common/http/testing';
import { PlatformComponent } from './platform.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../testing/test-setup';

describe('PlatformComponent', () => {
  let fixture: ComponentFixture<PlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlatformComponent, NavigationColumnComponent],
      imports: TEST_IMPORTS,
      providers: TEST_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformComponent);
    fixture.detectChanges();
  });

  it('lists only platforms that are not archived', () => {
    TestBed.inject(HttpTestingController)
      .expectOne('/api/platform/sorted')
      .flush([
        { id: '1', platformName: 'Active', score: 5, status: false },
        { id: '2', platformName: 'Archived', score: 3, status: true },
      ]);
    fixture.detectChanges();

    const rows = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Active');
  });
});
