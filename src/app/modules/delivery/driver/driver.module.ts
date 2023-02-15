import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { ListDriverComponent } from './components/list-driver/list-driver.component';
import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from './driver.component';
import { SharedModule } from '../../../shared/shared.module';
import { ToastsContainer } from '../../../shared/components/toast/toasts-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DriverComponent,
    ListDriverComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule,
    DriverRoutingModule,
    SharedModule,
    ToastsContainer,
    NgbModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class DriverModule { }
