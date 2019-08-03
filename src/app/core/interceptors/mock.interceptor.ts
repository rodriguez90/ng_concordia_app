import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import Optional from '../../../../projects/fbs-shared/src/lib/utils/optional';
import {environment} from '../../../environments/environment';

// app imports
import endpoints from '../mocks/endpoints';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (environment.mock) {
      const url = req.urlWithParams;
      const method = req.method;
      const response = Optional.of(
        Object.keys(endpoints)
          .find((endpointUrl: string) => {
            // console.log('Find url');
            // console.log('endpointUrl: ' + endpointUrl) ;
            // console.log('url: ' + url) ;
            // console.log('method: ' + method) ;
            // console.log(RegExp(endpointUrl).test(url)) ;
            return endpointUrl === url ? true : new RegExp(endpointUrl).test(url);
          })
      )
        .map((endpointUrl: string) => endpoints[endpointUrl][method])
        .map((mockedData: any) => typeof mockedData === 'function' ? mockedData(req) : mockedData)
        .filter((mockedData: any) => mockedData.body !== null && mockedData.body !== undefined)
        .map((mockedData: any) => new HttpResponse({
          body: typeof mockedData.body === 'function' ? mockedData.body(req) : mockedData.body,
          status: mockedData.status || 200
        }))
        .orElse(null);
      if (response) {
        return of(response);
      }
    }
    return next.handle(req);
  }
}
