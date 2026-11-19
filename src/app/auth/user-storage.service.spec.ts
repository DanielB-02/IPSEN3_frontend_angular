import { TestBed } from '@angular/core/testing';
import { UserStorageService } from './user-storage.service';
import { fakeJwt } from '../../testing/test-setup';

describe('UserStorageService', () => {
  let service: UserStorageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStorageService);
  });

  afterEach(() => localStorage.clear());

  it('reports no token before login and a token after saving one', () => {
    expect(UserStorageService.hasToken()).toBeFalse();
    service.saveToken('abc');
    expect(UserStorageService.hasToken()).toBeTrue();
    expect(UserStorageService.getToken()).toBe('abc');
  });

  it('removes the token on sign out', () => {
    service.saveToken('abc');
    service.signOut();
    expect(UserStorageService.hasToken()).toBeFalse();
  });

  it('detects the ADMIN role from the JWT', () => {
    service.saveToken(fakeJwt('ADMIN'));
    expect(service.isAdmin()).toBeTrue();
    expect(service.isReadonly()).toBeFalse();
    expect(service.isReadonlyOrFicter()).toBeFalse();
  });

  it('detects the READONLY role from the JWT', () => {
    service.saveToken(fakeJwt('READONLY'));
    expect(service.isAdmin()).toBeFalse();
    expect(service.isReadonly()).toBeTrue();
    expect(service.isReadonlyOrFicter()).toBeTrue();
  });

  it('treats FICTER as read-only-or-ficter but not as read-only', () => {
    service.saveToken(fakeJwt('FICTER'));
    expect(service.isReadonly()).toBeFalse();
    expect(service.isReadonlyOrFicter()).toBeTrue();
  });

  it('returns false for every role check when the token is malformed', () => {
    spyOn(console, 'error');
    service.saveToken('not-a-jwt');
    expect(service.isAdmin()).toBeFalse();
    expect(service.isReadonly()).toBeFalse();
    expect(service.isReadonlyOrFicter()).toBeFalse();
  });
});
