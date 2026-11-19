import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { RouterModule, provideRouter } from '@angular/router';
import { PlatformService } from '../app/services/platform.service';

/** Providers shared by component/service specs: fake HTTP backend, empty router, no animations. */
export const TEST_PROVIDERS = [
  provideHttpClient(withInterceptorsFromDi()),
  provideHttpClientTesting(),
  provideRouter([]),
  provideNoopAnimations(),
  PlatformService,
];

/** The modules AppModule makes available to its (non-standalone) components. */
export const TEST_IMPORTS = [
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  RouterModule,
];

/** Builds an unsigned JWT with the given role authorities (only for client-side decoding in tests). */
export function fakeJwt(...authorities: string[]): string {
  const encode = (value: object) =>
    btoa(JSON.stringify(value)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  return `${encode({ alg: 'none', typ: 'JWT' })}.${encode({
    sub: 'user@example.com',
    role: authorities.map((authority) => ({ authority })),
  })}.`;
}
