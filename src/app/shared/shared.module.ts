// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// librerias fbs de angular
import {FbsCoreModule} from '../../../projects/fbs-core';
import {FbsSharedModule} from '../../../projects/fbs-shared/src/lib/fbs-shared.module';


@NgModule({
    declarations: [
    ],
    imports: [
        FbsCoreModule,
        FbsSharedModule,
    ],
    exports: [
        FbsSharedModule,
    ],
    providers: [
    ]
})
export class SharedModule { }
