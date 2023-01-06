import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZoneComponent } from './zone.component';
import { CreateZoneComponent } from './create-zone/create-zone.component';
import { EditZoneComponent } from './edit-zone/edit-zone.component';

const routes: Routes = [
  {
    path: '',
    component: ZoneComponent,
    children: [
      {
        path: 'create',
        component: CreateZoneComponent,
      },
      { path: 'edit/:id', component: EditZoneComponent },
    ]

  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZoneRoutingModule {}
