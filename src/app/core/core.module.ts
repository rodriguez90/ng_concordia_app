// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

// app imports
import {
  AuthService,
  NavService,
  DashboardService,
  IconService
} from './services';

import { httpInterceptorProviders } from './interceptors';

import {Api} from './services/api';
import {CryptoJsService} from './services/crypto-js.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [],
  providers: [
    httpInterceptorProviders,
    Api,
    AuthService,
    CryptoJsService,
    DashboardService,
    IconService,
    NavService,
  ]
})
export class CoreModule { }
