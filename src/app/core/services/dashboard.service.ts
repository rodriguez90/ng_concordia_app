import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AppConfig, AppConfigService} from '../../config';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    url: string;
    endpoint: string;

    constructor(protected http: HttpClient,
                private configService: AppConfigService) {
        this.configService.config$.subscribe((config) => {
            if (config) {
                this.url = `${config.apiBaseUrl}${config.apiVersionName}`;
                this.endpoint = config.urlEndPoints.dashboard;
            }
        });
    }

    indicadores(): Observable<any> {
        return this.http.get(`${this.url}/${this.endpoint}`);
    }

    datosGrafico(): Observable<any> {
        return this.http.get(`${this.url}/${this.endpoint}/grafico`);
    }
}
