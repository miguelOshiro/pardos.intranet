import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDriverComponent } from './components/list-driver/list-driver.component';
import { EditDriverComponent } from './components/edit-driver/edit-driver.component';
import { CreateDriverComponent } from './components/create-driver/create-driver.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DropdownMenusModule } from 'src/app/partials/content/dropdown-menus/dropdown-menus.module';
import { WidgetsModule } from 'src/app/partials/content/widgets/widgets.module';
import { CardsModule } from 'src/app/partials/content/cards/cards.module';



@NgModule({
  declarations: [
    ListDriverComponent,
    EditDriverComponent,
    CreateDriverComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule,

    DropdownMenusModule,
    WidgetsModule,
    CardsModule,
  ]
})
export class DriverModule { }
