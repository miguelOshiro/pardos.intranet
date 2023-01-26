import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CardTotalComponent } from './partials/card-total/card-total.component';
import { CardIndicatorComponent } from './partials/card-indicator/card-indicator.component';
import { CardOrderComponent } from './partials/card-order/card-order.component';
import { CardCapacityComponent } from './partials/card-capacity/card-capacity.component';

@NgModule({
  declarations: [DashboardComponent, CardTotalComponent, CardIndicatorComponent,
                CardOrderComponent, CardCapacityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    InlineSVGModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
})
export class DashboardModule {}
