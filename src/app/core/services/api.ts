// angular imports
import { Injectable } from '@angular/core';

// lierias de terceros
import * as msRest from '@azure/ms-rest-js';

// api consola
import {ConcordiaApi, ConcordiaApiModels} from '../../../../projects/concordiaApi/lib/concordiaApi';
import {ConcordiaApiOptions} from '../../../../projects/concordiaApi/lib/models';

// app import
import {AppConfig, AppConfigService} from '../../config';

export interface GenericOptionalParams<T> extends msRest.RequestOptionsBase{
    modelo?: T;
    model?: T;
}

@Injectable({
    providedIn: 'root'
})
export class Api {
    optionsApi: ConcordiaApiModels.ConcordiaApiOptions = {};
    concordiaApi: ConcordiaApi;
    configuracion: AppConfig;

    constructor(private servicioConfiguracion: AppConfigService) {

        this.servicioConfiguracion.config$.subscribe(config => {
            this.configuracion = config;
            this.optionsApi.requestPolicyFactories = [];
            this.optionsApi.baseUri = `${this.configuracion.apiBaseUrl}`;
            this.concordiaApi = new ConcordiaApi(this.optionsApi);
        });
    }
}
