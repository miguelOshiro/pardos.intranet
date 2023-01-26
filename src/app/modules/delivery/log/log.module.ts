import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { LogComponent } from './log.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [LogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule,
    SharedModule
  ],
  providers: [DatePipe],
})
export class LogModule { }
