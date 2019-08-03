import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AppBlankComponent} from './components/blank/blank.component';
import {AppLayoutComponent} from './components/layout/app-layout.component';

// Home
import { HomePage } from './pages/home/home';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      { path: 'inicio', component: HomePage, data: { title: 'Home'} },
      {
          path: 'tramites',
          loadChildren: () => import('./procedure/procedure.module').then( m => m.ProcedureModule),
      },
    ],
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      { path: '', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},
    ]
  },
  { path: '**', redirectTo: '/404' },
  // { path: '404', component: PageNotFoundComponent },
  // { path: '403', component: ForbiddenComponent },
];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }
