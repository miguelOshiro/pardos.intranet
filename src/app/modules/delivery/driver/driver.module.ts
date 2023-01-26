import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { ListDriverComponent } from './components/list-driver/list-driver.component';
import { EditDriverComponent } from './components/edit-driver/edit-driver.component';

import { DriverRoutingModule } from './driver-routing.module';

@NgModule({
  declarations: [
    ListDriverComponent,
    EditDriverComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule,
    DriverRoutingModule

  ]
})
export class DriverModule { }
