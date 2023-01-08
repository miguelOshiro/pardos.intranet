import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZoneComponent } from './zone.component';
import { CreateZoneComponent } from './components/create-zone/create-zone.component';
import { EditZoneComponent } from './components/edit-zone/edit-zone.component';
import { ListZoneComponent } from './components/list-zone/list-zone.component';

const routes: Routes = [
  {
    path: '',
    component: ZoneComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListZoneComponent,
      },
      {
        path: 'create',
        component: CreateZoneComponent,
      },
      { path: 'edit', component: EditZoneComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZoneRoutingModule {}
