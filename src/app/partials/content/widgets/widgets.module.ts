import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MixedWidgetComponent } from './mixed/mixed-widget/mixed-widget.component';
import { MixedWidget2Component } from './mixed/mixed-widget2/mixed-widget2.component';
import { MixedWidget3Component } from './mixed/mixed-widget3/mixed-widget3.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownMenusModule } from '../dropdown-menus/dropdown-menus.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FeedsWidgetComponent } from './feeds/feeds-widget/feeds-widget.component';
import { FeedsWidget2Component } from './feeds/feeds-widget2/feeds-widget2.component';
import { FeedsWidget3Component } from './feeds/feeds-widget3/feeds-widget3.component';
import { StatsWidgetComponent } from './stats/stats-widget/stats-widget.component';
import { StatsWidget2Component } from './stats/stats-widget2/stats-widget2.component';
import { StatsWidget3Component } from './stats/stats-widget3/stats-widget3.component';
import { CardsModule } from '../cards/cards.module';


@NgModule({
  declarations: [
    MixedWidgetComponent,
    MixedWidget2Component,
    MixedWidget3Component,
    FeedsWidgetComponent,
    FeedsWidget2Component,
    FeedsWidget3Component,
    StatsWidgetComponent,
    StatsWidget2Component,
    StatsWidget3Component,

  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    DropdownMenusModule,
    NgApexchartsModule,
    NgbDropdownModule,
    CardsModule
  ],
  exports: [
    MixedWidgetComponent,
    MixedWidget2Component,
    MixedWidget3Component,
    FeedsWidgetComponent,
    FeedsWidget2Component,
    FeedsWidget3Component,
    StatsWidgetComponent,
    StatsWidget2Component,
    StatsWidget3Component,
  ]
})
export class WidgetsModule { }
