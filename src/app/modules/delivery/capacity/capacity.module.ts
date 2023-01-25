import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCapacityComponent } from './components/create-capacity/create-capacity.component';
import { EditCapacityComponent } from './components/edit-capacity/edit-capacity.component';
import { ListCapacityComponent } from './components/list-capacity/list-capacity.component';



@NgModule({
  declarations: [
    CreateCapacityComponent,
    EditCapacityComponent,
    ListCapacityComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CapacityModule { }
