import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { PlatformService } from './platform.service';
import { Platform } from '../model/platform/platform';
import { TEST_PROVIDERS } from '../../testing/test-setup';

const platforms = (n: number): Platform[] =>
  Array.from({ length: n }, (_, i) => ({ id: `${i}`, platformName: `P${i}`, score: i, status: false }));

describe('PlatformService', () => {
  let service: PlatformService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: TEST_PROVIDERS });
    service = TestBed.inject(PlatformService);
    httpMock = TestBed.inject(HttpTestingController);
    // The service loads the platform list as soon as it is created.
    httpMock.expectOne('/api/platform/sorted').flush(platforms(3));
  });

  afterEach(() => httpMock.verify());

  it('publishes the initially loaded platforms', () => {
    let current: Platform[] = [];
    service.platforms$.subscribe((p) => (current = p));
    expect(current.length).toBe(3);
  });

  it('limits the ascending score list to 10 platforms', () => {
    let result: Platform[] = [];
    service.findByScoreAsc().subscribe((p) => (result = p));
    httpMock.expectOne('/api/platform/sorted').flush(platforms(15));
    expect(result.length).toBe(10);
  });

  it('limits the descending score list to 5 platforms', () => {
    let result: Platform[] = [];
    service.findByScoreDesc().subscribe((p) => (result = p));
    httpMock.expectOne('/api/platform/sortedDesc').flush(platforms(15));
    expect(result.length).toBe(5);
  });

  it('reloads the platform list after an update', () => {
    const updated = { ...platforms(1)[0], status: true };
    service.updatePlatform('0', updated).subscribe();

    const put = httpMock.expectOne('/api/platform/0');
    expect(put.request.method).toBe('PUT');
    put.flush(updated);

    httpMock.expectOne('/api/platform/sorted').flush([updated]);
    let current: Platform[] = [];
    service.platforms$.subscribe((p) => (current = p));
    expect(current).toEqual([updated]);
  });
});
