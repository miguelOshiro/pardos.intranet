import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrderComponent } from './order.component';
import { SharedModule } from '../../../shared/shared.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownStatusComponent } from './partials/dropdown-status/dropdown-status.component';
import { DropdownPlatformComponent } from './partials/dropdown-platform/dropdown-platform.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    OrderComponent,
    DropdownStatusComponent,
    DropdownPlatformComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule,
    SharedModule,
    NgbModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [DatePipe],
})
export class OrderModule { }
