import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryComponent } from './delivery.component';
import { CapacityComponent } from './capacity/capacity.component';
import { DriverComponent } from './driver/driver.component';
import { HistoryComponent } from './history/history.component';
import { LogComponent } from './log/log.component';
import { ManagementComponent } from './manager/management.component';
import { OrderComponent } from './order/order.component';


const routes: Routes = [
  {
    path: '',
    component: DeliveryComponent,
    children: [

      {
        path: 'manager',
        component: ManagementComponent,
        loadChildren: () =>
          import('./manager/management.module').then((m) => m.ManagementModule),
        data: { title: 'Manager' },
      },
      {
        path: 'capacity',
        component: CapacityComponent,
        data: { title: 'Capacidad' },
      },
      {
        path: 'driver',
        component: DriverComponent,
        loadChildren: () =>
          import('../delivery/driver/driver.module').then((m) => m.DriverModule),
        data: { title: 'Driver' },
      },
      {
        path: 'history',
        component: HistoryComponent,
        data: { title: 'Historia' },
      },
      {
        path: 'log',
        component: LogComponent,
        data: { title: 'Log' },
      },
      {
        path: 'order',
        component: OrderComponent,
        data: { title: 'Order' },
      },

      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryRoutingModule { }
