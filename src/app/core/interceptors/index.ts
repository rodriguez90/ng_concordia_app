import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockInterceptor, } from './mock.interceptor';
import {HttpTokenInterceptor} from '../../../../projects/fbs-core/src/lib/interceptors';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
