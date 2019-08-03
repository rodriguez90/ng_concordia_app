import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// app component
import { LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

const authRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent ,
    },
    {
        path: 'registro',
        component: RegisterComponent ,
    },
    {
        path: 'logout',
        redirectTo: 'login',
    },
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule],
    declarations: []
})
export class AuthRoutingModule { }
