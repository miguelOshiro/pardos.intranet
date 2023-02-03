import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementComponent } from './management.component';
import { ListManagementComponent } from './components/list-manager/list-management.component';
import { CreateManagementComponent } from './components/create-management/create-management.component';
import { EditManagementComponent } from './components/edit-management/edit-management.component';
import { CardSettingComponent } from './partials/card-setting/card-setting.component';
import { ListSettingComponent } from './components/list-setting/list-setting.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListManagementComponent,
      },
      {
        path: 'create',
        component: CreateManagementComponent,
      },
      {
        path: 'edit/:id',
        component: EditManagementComponent
      },
      {
        path: 'setting/:id',
        component: CardSettingComponent
      },
      {
        path: 'settings/:id',
        component: ListSettingComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule { }
