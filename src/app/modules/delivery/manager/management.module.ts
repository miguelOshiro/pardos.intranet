import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListManagementComponent } from './components/list-manager/list-management.component';
import { CreateManagementComponent } from './components/create-management/create-management.component';
import { EditManagementComponent } from './components/edit-management/edit-management.component';
import { ManagementRoutingModule } from './management-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ManagementComponent } from './management.component';
import { DropdownMenuActionComponent } from './partials/dropdown-menu-action/dropdown-menu-action.component';
import { CardManagementComponent } from './partials/card-management/card-management.component';
import { SharedModule } from '../../../shared/shared.module';
import { CardSettingComponent } from './partials/card-setting/card-setting.component';
import { ListSettingComponent } from './components/list-setting/list-setting.component';
import { ToastsContainer } from '../../../shared/components/toast/toasts-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ManagementComponent,
    ListManagementComponent,
    CreateManagementComponent,
    EditManagementComponent,
    DropdownMenuActionComponent,
    CardManagementComponent,
    CardSettingComponent,
    ListSettingComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule,
    SharedModule,
    ToastsContainer,
    NgbModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [

  ]
})
export class ManagementModule { }
