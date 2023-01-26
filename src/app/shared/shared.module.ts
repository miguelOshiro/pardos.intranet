import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownEstablishmentComponent } from './components/dropdowns/dropdown-establishment/dropdown-establishment.component';
import { DropdownZoneComponent } from './components/dropdowns/dropdown-zone/dropdown-zone.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  declarations: [
    DropdownEstablishmentComponent,
    DropdownZoneComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule,
  ],
  exports: [
    DropdownEstablishmentComponent,
    DropdownZoneComponent
  ]
})
export class SharedModule { }
