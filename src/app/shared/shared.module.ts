import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownEstablishmentComponent } from './components/dropdowns/dropdown-establishment/dropdown-establishment.component';
import { DropdownZoneComponent } from './components/dropdowns/dropdown-zone/dropdown-zone.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownManagementStatusComponent } from '../modules/delivery/manager/partials/dropdown-management-status/dropdown-management-status.component';
import { DropdownManagementComponent } from './components/dropdowns/dropdown-management/dropdown-management.component';

@NgModule({
  declarations: [
    DropdownEstablishmentComponent,
    DropdownZoneComponent,
    DropdownManagementStatusComponent,
    DropdownManagementComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule,
  ],
  exports: [
    DropdownEstablishmentComponent,
    DropdownZoneComponent,
    DropdownManagementStatusComponent,
    DropdownManagementComponent
  ]
})
export class SharedModule { }
