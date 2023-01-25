import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { ListManagerComponent } from './components/list-manager/list-manager.component';
import { CreateManagerComponent } from './components/create-manager/create-manager.component';
import { EditManagerComponent } from './components/edit-manager/edit-manager.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListManagerComponent,
      },
      {
        path: 'create',
        component: CreateManagerComponent,
      },
      { path: 'edit/:id', component: EditManagerComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule { }
