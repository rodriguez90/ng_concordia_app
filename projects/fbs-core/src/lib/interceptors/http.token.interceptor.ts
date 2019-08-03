import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtService} from '../services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(private jwtService: JwtService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.jwtService.getToken();
        if (token) {
            req = req.clone({
                setHeaders: {
                    // 'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${token}`,
                    // Roles: JSON.stringify(roles),
                }
            });
        }
        return next.handle(req);
    }


}
