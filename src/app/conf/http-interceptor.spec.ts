import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { ApiHeadersInterceptor } from './http-interceptor';
import { TEST_PROVIDERS } from '../../testing/test-setup';

describe('ApiHeadersInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.setItem('l_token', 'jwt-token');
    TestBed.configureTestingModule({
      providers: [
        ...TEST_PROVIDERS,
        { provide: HTTP_INTERCEPTORS, useClass: ApiHeadersInterceptor, multi: true },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('adds the bearer token and versioned media type to API calls', () => {
    http.get('/api/platform').subscribe();
    const req = httpMock.expectOne('/api/platform');
    expect(req.request.headers.get('Authorization')).toBe('Bearer jwt-token');
    expect(req.request.headers.get('Accept')).toBe('application/vnd.spine.api.v2+json');
    req.flush([]);
  });

  it('does not send a bearer token to auth endpoints', () => {
    http.post('/api/auth/signin', {}).subscribe();
    const req = httpMock.expectOne('/api/auth/signin');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });
});
