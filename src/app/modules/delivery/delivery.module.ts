import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapacityComponent } from './capacity/capacity.component';
import { DriverComponent } from './driver/driver.component';
import { DeliveryComponent } from './delivery.component';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ZoneModule } from './zone/zone.module';
import { DropdownMenusModule } from '../../partials/content/dropdown-menus/dropdown-menus.module';
import { WidgetsModule } from 'src/app/partials/content/widgets/widgets.module';
import { ManagerModule } from './manager/manager.module';
import { CardsModule } from 'src/app/partials/content/cards/cards.module';
import { HistoryModule } from './history/history.module';
import { LogModule } from './log/log.module';


@NgModule({
  declarations: [
    CapacityComponent,
    DriverComponent,
    DeliveryComponent,
    
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    CardsModule,
    ZoneModule,
    ManagerModule,
    HistoryModule,
    LogModule
  ],
  exports: [
    
  ]
})
export class DeliveryModule { }
