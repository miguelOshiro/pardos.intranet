import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoneComponent } from './zone.component';
import { CreateZoneComponent } from './components/create-zone/create-zone.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ZoneRoutingModule } from './zone-routing.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { EditZoneComponent } from './components/edit-zone/edit-zone.component';
import { DropdownMenusModule } from '../../../partials/content/dropdown-menus/dropdown-menus.module';
import { ListZoneComponent } from './components/list-zone/list-zone.component';
import { WidgetsModule } from 'src/app/partials/content/widgets/widgets.module';


@NgModule({
  declarations: [
    ZoneComponent,
    CreateZoneComponent,
    EditZoneComponent,
    ListZoneComponent,   
  ],
  imports: [
    CommonModule,
    ZoneRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    
  ],
  exports: [
    
  ]
})

export class ZoneModule { }
