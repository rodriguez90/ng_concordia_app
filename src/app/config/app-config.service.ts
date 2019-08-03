import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from './app-config';
import {ConfigService} from '../../../projects/fbs-core/src/lib/config';

export function configurationServiceInitializerFactory(configurationService: AppConfigService): Function {
    // a lambda is required here, otherwise `this` won't work inside ConfigurationService::load
    return () => configurationService.load();
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService extends ConfigService<AppConfig> {

  constructor(http: HttpClient) {
    super(http, 'assets/config/config.json');
  }
}
