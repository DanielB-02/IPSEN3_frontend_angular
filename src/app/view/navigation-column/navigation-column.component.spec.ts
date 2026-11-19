import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationColumnComponent } from './navigation-column.component';
import { TEST_IMPORTS, TEST_PROVIDERS } from '../../../testing/test-setup';

describe('NavigationColumnComponent', () => {
  let fixture: ComponentFixture<NavigationColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationColumnComponent],
      imports: TEST_IMPORTS,
      providers: TEST_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationColumnComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
