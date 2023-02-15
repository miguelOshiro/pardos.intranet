import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { DeliveryComponent } from './delivery.component';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { ManagementModule } from './manager/management.module';

import { CapacityModule } from './capacity/capacity.module';
import { LogModule } from './log/log.module';
import { HistoryModule } from './history/history.module';
import { DriverModule } from './driver/driver.module';
import { OrderModule } from './order/order.module';

@NgModule({
  declarations: [
    DeliveryComponent,

  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    InlineSVGModule,
    CapacityModule,
    ManagementModule,
    HistoryModule,
    LogModule,
    DriverModule,
    OrderModule,
  ],
  exports: [
  ],
})
export class DeliveryModule { }
