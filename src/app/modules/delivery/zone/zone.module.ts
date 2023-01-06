import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoneComponent } from './zone.component';
import { CreateZoneComponent } from './create-zone/create-zone.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ZoneRoutingModule } from './zone-routing.module';
import { WidgetsModule } from '../../../_metronic/partials/content/widgets_1/widgets.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { EditZoneComponent } from './edit-zone/edit-zone.component';
import { DropdownMenusModule } from '../../../shared/components/dropdown-menus/dropdown-menus.module';


@NgModule({
  declarations: [
    ZoneComponent,
    CreateZoneComponent,
    EditZoneComponent,   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ZoneRoutingModule,
    InlineSVGModule,
    
    DropdownMenusModule,
    WidgetsModule,
    
  ]
})

export class ZoneModule { }
