import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { UserStorageService } from './user-storage.service';
import { TEST_PROVIDERS } from '../../testing/test-setup';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: TEST_PROVIDERS });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('posts the credentials and stores the returned token', () => {
    let result: boolean | undefined;
    service.login('user@example.com', 'secret').subscribe((ok: boolean) => (result = ok));

    const req = httpMock.expectOne('/api/auth/signin');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'user@example.com', password: 'secret' });
    req.flush({ token: 'jwt-token' });

    expect(result).toBeTrue();
    expect(UserStorageService.getToken()).toBe('jwt-token');
  });

  it('propagates a failed login without storing a token', () => {
    spyOn(console, 'error');
    let status: number | undefined;
    service.login('user@example.com', 'wrong').subscribe({
      error: (err: { status: number }) => (status = err.status),
    });

    httpMock.expectOne('/api/auth/signin').flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(status).toBe(401);
    expect(UserStorageService.hasToken()).toBeFalse();
  });

  it('clears the token on logout', () => {
    localStorage.setItem('l_token', 'jwt-token');
    service.logout();
    expect(UserStorageService.hasToken()).toBeFalse();
  });
});
