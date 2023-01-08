import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoneComponent } from './zone.component';
import { CreateZoneComponent } from './components/create-zone/create-zone.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ZoneRoutingModule } from './zone-routing.module';
import { WidgetsModule } from '../../../_metronic/partials/content/widgets_1/widgets.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { EditZoneComponent } from './components/edit-zone/edit-zone.component';
import { DropdownMenusModule } from '../../../shared/components/dropdown-menus/dropdown-menus.module';
import { ListZoneComponent } from './components/list-zone/list-zone.component';


@NgModule({
  declarations: [
    ZoneComponent,
    CreateZoneComponent,
    EditZoneComponent,
    ListZoneComponent,   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ZoneRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    
  ],
  exports: [
    
  ]
})

export class ZoneModule { }
