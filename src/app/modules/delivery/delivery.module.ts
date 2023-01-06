import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapacityComponent } from './capacity/capacity.component';
import { DriverComponent } from './driver/driver.component';
import { HistoryComponent } from './history/history.component';
import { LogComponent } from './log/log.component';
import { ReportComponent } from './report/report.component';
import { DeliveryComponent } from './delivery.component';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ZoneModule } from './zone/zone.module';
import {
  CardsModule,
  WidgetsModule,
} from '../../_metronic/partials';
import { ManagerComponent } from './manager/manager.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownMenusModule } from '../../shared/components/dropdown-menus/dropdown-menus.module';


@NgModule({
  declarations: [
    CapacityComponent,
    DriverComponent,
    HistoryComponent,
    LogComponent,
    ReportComponent,
    DeliveryComponent,
    ManagerComponent,
    
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    InlineSVGModule,
    ReactiveFormsModule,
    DropdownMenusModule,
    WidgetsModule,
    CardsModule,
    ZoneModule,
  ]
})
export class DeliveryModule { }
