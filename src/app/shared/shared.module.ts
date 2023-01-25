import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownEstablishmentComponent } from './components/dropdowns/dropdown-establishment/dropdown-establishment.component';
import { DropdownZoneComponent } from './components/dropdowns/dropdown-zone/dropdown-zone.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { WidgetsModule } from 'src/app/partials/content/widgets/widgets.module';
import { DropdownMenusModule } from '../partials/content/dropdown-menus/dropdown-menus.module';


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
    DropdownMenusModule,
    WidgetsModule,
  ],
  exports: [
    DropdownEstablishmentComponent,
    DropdownZoneComponent
  ]
})
export class SharedModule { }
