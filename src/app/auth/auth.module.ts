import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// app and auth components
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import {FbsSharedModule} from '../../../projects/fbs-shared/src/lib/fbs-shared.module';
import {FbsCoreModule} from '../../../projects/fbs-core';
import {CoreModule} from '../core/core.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
    declarations: [LoginComponent, RegisterComponent, ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FbsCoreModule,
        FbsSharedModule,
        // CoreModule,
        SharedModule,
        AuthRoutingModule
    ],
    exports: [LoginComponent, AuthRoutingModule]
})
export class AuthModule { }
