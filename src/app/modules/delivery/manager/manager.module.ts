import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListManagerComponent } from './components/list-manager/list-manager.component';
import { CreateManagerComponent } from './components/create-manager/create-manager.component';
import { EditManagerComponent } from './components/edit-manager/edit-manager.component';
import { ManagerRoutingModule } from './manager-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownMenusModule } from '../../../partials/content/dropdown-menus/dropdown-menus.module';
import { ManagerComponent } from './manager.component';
import { WidgetsModule } from 'src/app/partials/content/widgets/widgets.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ManagerComponent,
    ListManagerComponent,
    CreateManagerComponent,
    EditManagerComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    SharedModule
  ]
})
export class ManagerModule { }
