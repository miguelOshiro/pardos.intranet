import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListManagerComponent } from './components/list-manager/list-manager.component';
import { CreateManagerComponent } from './components/create-manager/create-manager.component';
import { EditManagerComponent } from './components/edit-manager/edit-manager.component';
import { ManagerRoutingModule } from './manager-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ManagerComponent } from './manager.component';
import { DropdownMenuActionComponent } from './partials/dropdown-menu-action/dropdown-menu-action.component';
import { CardManagerComponent } from './partials/card-manager/card-manager.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    ManagerComponent,
    ListManagerComponent,
    CreateManagerComponent,
    EditManagerComponent,
    DropdownMenuActionComponent,
    CardManagerComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule,
    SharedModule
  ],
  exports: [
    
  ]
})
export class ManagerModule { }
