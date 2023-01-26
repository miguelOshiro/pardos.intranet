import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { DriverComponent } from './driver/driver.component';
import { DeliveryComponent } from './delivery.component';

import { DeliveryRoutingModule } from './delivery-routing.module';

import { CapacityModule } from './capacity/capacity.module';
import { LogModule } from './log/log.module';
import { ManagerModule } from './manager/manager.module';
import { HistoryModule } from './history/history.module';

@NgModule({
  declarations: [
    DriverComponent,
    DeliveryComponent,
    
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    InlineSVGModule,
    CapacityModule,
    ManagerModule,
    HistoryModule,
    LogModule,
  ],
  exports: [
    
  ]
})
export class DeliveryModule { }
