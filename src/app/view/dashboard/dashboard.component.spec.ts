import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationColumnComponent } from '../navigation-column/navigation-column.component';
import { DashboardComponent } from './dashboard.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../testing/test-setup';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, NavigationColumnComponent],
      imports: TEST_IMPORTS,
      providers: TEST_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
