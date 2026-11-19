import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRoleComponent } from './add-role.component';
import { TEST_PROVIDERS } from '../../../../../testing/test-setup';

describe('AddRoleComponent', () => {
  let fixture: ComponentFixture<AddRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRoleComponent],
      providers: TEST_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(AddRoleComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
