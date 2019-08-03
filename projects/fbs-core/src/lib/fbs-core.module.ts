import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';

import { FbsCoreComponent } from './fbs-core.component';

import {
    JwtService,
    GeolocationService,
    OverlayService,
    FileManagerService
} from './services';

import {
    UserAdapter,
} from './adapters';


@NgModule({
    declarations: [FbsCoreComponent],
    imports: [
        CommonModule,
        OverlayModule,
        HttpClientModule,
    ],
    exports: [FbsCoreComponent],
    providers: [
        JwtService,
        UserAdapter,
        GeolocationService,
        OverlayService,
        FileManagerService
    ]
})
export class FbsCoreModule { }
