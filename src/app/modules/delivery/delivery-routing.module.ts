import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryComponent } from './delivery.component';
import { CapacityComponent } from './capacity/capacity.component';
import { DriverComponent } from './driver/driver.component';
import { HistoryComponent } from './history/history.component';
import { LogComponent } from './log/log.component';
import { ManagerComponent } from './manager/manager.component';


const routes: Routes = [
  {
    path: '',
    component: DeliveryComponent,
    children: [

      {
        path: 'manager',
        component: ManagerComponent,
        loadChildren: () =>
      import('../delivery/manager/manager.module').then((m) => m.ManagerModule),
        data: {title: 'Manager'},
      },
      {
        path: 'capacity',
        component: CapacityComponent,
        data: {title: 'Capacidad'},
      },
      {
        path: 'driver',
        component: DriverComponent,
        data: {title: 'Driver'},
      },
      {
        path: 'history',
        component: HistoryComponent,
        data: {title: 'Historia'},
      },
      {
        path: 'log',
        component: LogComponent,
        data: {title: 'Log'},
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
export class DeliveryRoutingModule {}
