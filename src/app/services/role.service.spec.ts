import { TestBed } from '@angular/core/testing';
import { RoleService } from './role.service';
import { TEST_PROVIDERS } from '../../testing/test-setup';

describe('RoleService', () => {
  it('should be created', () => {
    TestBed.configureTestingModule({ providers: TEST_PROVIDERS });
    expect(TestBed.inject(RoleService)).toBeTruthy();
  });
});
