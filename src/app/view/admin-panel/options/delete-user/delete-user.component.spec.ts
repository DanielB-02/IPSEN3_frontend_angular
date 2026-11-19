import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteUserComponent } from './delete-user.component';
import { TEST_PROVIDERS } from '../../../../../testing/test-setup';

describe('DeleteUserComponent', () => {
  let fixture: ComponentFixture<DeleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteUserComponent],
      providers: TEST_PROVIDERS,
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteUserComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
