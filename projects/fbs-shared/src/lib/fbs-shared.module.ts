// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// fbs library imports
import { FbsSharedComponent } from './fbs-shared.component';
import {FbsCoreModule} from '../../../fbs-core';

@NgModule({
  declarations: [
      FbsSharedComponent,
  ],
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      FbsCoreModule,
  ],
  exports: [
      // Modules
      CommonModule,
      FormsModule,
      ReactiveFormsModule,

      // Components
      FbsSharedComponent,
  ]
})
export class FbsSharedModule { }
