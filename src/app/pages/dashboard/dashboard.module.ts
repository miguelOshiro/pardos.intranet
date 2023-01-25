import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WidgetsModule } from 'src/app/partials/content/widgets/widgets.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownMenusModule } from 'src/app/partials/content/dropdown-menus/dropdown-menus.module';
import { CardsModule } from 'src/app/partials/content/cards/cards.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    WidgetsModule,
    InlineSVGModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownMenusModule,
    CardsModule,
    SharedModule
  ],
})
export class DashboardModule {}
