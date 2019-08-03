import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpTokenInterceptor} from '../../../../projects/fbs-core/src/lib/interceptors';

export const httpInterceptorProviders = [
// ejemplo aqui poner el interceptor de token
  { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
