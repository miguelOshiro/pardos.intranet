import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownMenusModule } from '../../../partials/content/dropdown-menus/dropdown-menus.module';
import { WidgetsModule } from 'src/app/partials/content/widgets/widgets.module';
import { HistoryComponent } from './history.component';
import { SharedModule } from '../../../shared/shared.module';




@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    SharedModule
  ],
  providers: [DatePipe],
})
export class HistoryModule { }
