import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacityComponent } from './capacity.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharedModule } from '../../../shared/shared.module';
import { CapacityRoutingModule } from './capacity-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from '../../../shared/components/toast/toasts-container.component';

@NgModule({
  declarations: [
    CapacityComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule,
    CapacityRoutingModule,
    SharedModule,
    ToastsContainer,
    NgbModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CapacityModule { }
