import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacityComponent } from './capacity.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharedModule } from '../../../shared/shared.module';
import { CapacityRoutingModule } from './capacity-routing.module';




@NgModule({
  declarations: [
    CapacityComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule,
    CapacityRoutingModule,
    SharedModule
  ]
})
export class CapacityModule { }
