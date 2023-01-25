import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Card3Component } from './card3/card3.component';
import { Card2Component } from './card2/card2.component';
import { CardComponent } from './card/card.component';

import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownMenusModule } from '../../content/dropdown-menus/dropdown-menus.module';


@NgModule({
  declarations: [
    CardComponent,
    Card2Component,
    Card3Component
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    NgbTooltipModule,
    DropdownMenusModule
  ],
  exports: [
    CardComponent,
    Card2Component,
    Card3Component
  ]
})
export class CardsModule { }
