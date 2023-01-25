import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryComponent } from './delivery.component';
import { CapacityComponent } from './capacity/capacity.component';
import { DriverComponent } from './driver/driver.component';
import { HistoryComponent } from './history/history.component';
import { LogComponent } from './log/log.component';
import { ManagerComponent } from './manager/manager.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';


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
        path: 'zone',
        loadChildren: () =>
      import('../delivery/zone/zone.module').then((m) => m.ZoneModule),
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
      // {
      //   path: 'report',
      //   component: ReportComponent,
      //   data: {title: 'Reportes'},
      // },
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
