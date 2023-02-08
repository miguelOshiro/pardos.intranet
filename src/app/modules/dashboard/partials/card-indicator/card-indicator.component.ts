import { Component, Input } from '@angular/core';
import { ManagementStatusQueryModel } from '../../../delivery/manager/models/management-status-query.model';
import { ManagementQueryModel } from '../../../delivery/manager/models/management-query.model';

@Component({
  selector: 'app-card-indicator',
  templateUrl: './card-indicator.component.html',
})
export class CardIndicatorComponent {

  @Input() model: ManagementQueryModel;

  @Input() icon: string = '';
  @Input() statusColor: string = '';
  @Input() title: string = '';
  @Input() title2: string = '';

  @Input() progress: number = 50;


  constructor() { }




  data: Array<any> = [
    {
      'availability': 60, 'referential_time': 60,
      'reopening_factor': 0.02, 'state': 'Abierto'
    }
  ]
}
